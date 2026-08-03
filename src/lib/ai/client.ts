import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ollama } from 'ollama';

// Determine active AI Provider ('ollama', 'local', 'gemini', 'openai')
export const AI_PROVIDER = process.env.AI_PROVIDER || 'ollama';

// Ollama Local AI Configuration
export const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
export const OLLAMA_CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || 'llama3.2';
export const OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text';
export const ollamaClient = new Ollama({ host: OLLAMA_HOST });

// Google Gemini Client Initialization
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || 'dummy-key-for-build');
export const GEMINI_CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-3.6-flash';
export const GEMINI_FALLBACK_MODELS = Array.from(
  new Set(
    [
      GEMINI_CHAT_MODEL,
      ...(process.env.GEMINI_FALLBACK_MODELS
        ? process.env.GEMINI_FALLBACK_MODELS.split(',').map((model) => model.trim()).filter(Boolean)
        : ['gemini-3.6-flash']),
    ].filter(Boolean)
  )
);
export const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-2';
export const GEMINI_EMBEDDING_DIMENSIONS = Number(process.env.GEMINI_EMBEDDING_DIMENSIONS || 768);

// OpenAI Client Initialization (Legacy / Optional)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  timeout: 30000,
});
export const OPENAI_CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
export const OPENAI_EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

