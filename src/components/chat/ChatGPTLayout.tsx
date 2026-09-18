'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatGPTSidebar, ChatHistoryItem } from './ChatGPTSidebar';
import { ChatGPTMainView } from './ChatGPTMainView';
import { IMessageDocument } from '@/types';

const SESSION_STORAGE_KEY = 'dudi_chat_anonymous_session_id';

export const ChatGPTLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anonymousSessionId, setAnonymousSessionId] = useState<string>('');
  const [conversations, setConversations] = useState<ChatHistoryItem[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Partial<IMessageDocument>[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize Session ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedId = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!storedId) {
        storedId = `sess_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
        sessionStorage.setItem(SESSION_STORAGE_KEY, storedId);
      }
      setAnonymousSessionId(storedId);
    }
  }, []);

  // Fetch Conversation History for Sidebar
  const fetchConversations = async (sessId: string) => {
    try {
      const res = await fetch(`/api/chat/conversations?anonymousSessionId=${sessId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setConversations(data.data);
      }
    } catch (err) {
      console.error('[Fetch Conversations Error]:', err);
    }
  };

  useEffect(() => {
    if (anonymousSessionId) {
      fetchConversations(anonymousSessionId);
    }
  }, [anonymousSessionId]);

  // Load Messages when Active Conversation changes
  const loadConversationMessages = async (convId: string) => {
    try {
      const res = await fetch(`/api/chat/conversations/${convId}/messages`);
      const data = await res.json();
      if (data.success && data.data) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error('[Load Messages Error]:', err);
    }
  };

  const handleSelectConversation = (id: string) => {
    if (id.startsWith('demo_')) {
      // Demo item selected: reset messages state
      setActiveConversationId(id);
      setMessages([]);
      return;
    }
    setActiveConversationId(id);
    loadConversationMessages(id);
  };

  // Start New Chat Session
  const handleNewChat = async () => {
    handleStopStream();
    setActiveConversationId(null);
    setMessages([]);
    setError(null);
    setInput('');
  };

  // Stop Stream Generation
  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Send Message & Handle Realtime Stream Response
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isStreaming || !anonymousSessionId) return;

    setError(null);
    setInput('');

    let convId = activeConversationId;

    // Create new conversation in DB if not existing yet
    if (!convId || convId.startsWith('demo_')) {
      try {
        const res = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ anonymousSessionId, createNew: true }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          convId = data.data._id;
          setActiveConversationId(convId);
          fetchConversations(anonymousSessionId);
        }
      } catch (err) {
        console.error('[Create Conv Error]:', err);
        setError('Không thể tạo cuộc hội thoại.');
        return;
      }
    }

    if (!convId) return;

    // Append User Message to local state
    const tempUserMsg: Partial<IMessageDocument> = {
      role: 'USER',
      content: textToSend.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);

    // Append Assistant Placeholder
    const tempAssistantMsg: Partial<IMessageDocument> = {
      role: 'ASSISTANT',
      content: '',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempAssistantMsg]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`/api/chat/conversations/${convId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textToSend.trim(),
          anonymousSessionId,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Gửi tin nhắn thất bại');
      }

      if (!response.body) {
        throw new Error('Không nhận được dữ liệu stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });
        streamedText += chunkText;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'ASSISTANT') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: streamedText,
            };
          }
          return updated;
        });
      }

      // Refresh sidebar conversation list
      fetchConversations(anonymousSessionId);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('[Stream Aborted]');
      } else {
        console.error('[Stream Error]:', err);
        setError(err.message || 'Lỗi tạo phản hồi');
        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'ASSISTANT') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              status: 'ERROR',
              error: err.message || 'Lỗi tạo phản hồi từ AI',
            };
          }
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#212121] overflow-hidden">
      {/* ChatGPT Collapsible Sidebar */}
      <ChatGPTSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        conversations={conversations}
        activeId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
      />

      {/* ChatGPT Central Main Workspace */}
      <ChatGPTMainView
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        messages={messages}
        input={input}
        setInput={setInput}
        isStreaming={isStreaming}
        onSendMessage={handleSendMessage}
        onStopStream={handleStopStream}
        onNewChat={handleNewChat}
      />
    </div>
  );
};
