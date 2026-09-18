'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Eye, 
  FileText, 
  Tag, 
  Calendar, 
  Edit3, 
  Save, 
  UploadCloud, 
  FileUp, 
  Loader2, 
  FileCheck, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { IKnowledgeDocument } from '@/types';

export default function AdminKnowledgePage() {
  const [documents, setDocuments] = useState<IKnowledgeDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<IKnowledgeDocument | null>(null);

  // Add Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Chính sách');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [sourceType, setSourceType] = useState<'TEXT' | 'DOCX'>('TEXT');
  const [sourceName, setSourceName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Word Import & AI Classification State
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [isProcessingWord, setIsProcessingWord] = useState(false);
  const [isClassifyingText, setIsClassifyingText] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Form State
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/knowledge?limit=100');
      const data = await res.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (err) {
      console.error('Fetch docs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const openViewDoc = (doc: IKnowledgeDocument) => {
    setSelectedDoc(doc);
    setEditTitle(doc.title);
    setEditCategory(doc.category);
    setEditContent(doc.content);
    setIsEditingDoc(false);
  };

  const resetAddForm = () => {
    setTitle('');
    setCategory('Chính sách');
    setContent('');
    setTagsInput('');
    setWordFile(null);
    setSourceType('TEXT');
    setSourceName('');
    setAiNotice(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenAddModal = (triggerWordUpload = false) => {
    resetAddForm();
    setShowModal(true);
    if (triggerWordUpload) {
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 200);
    }
  };

  // Xử lý upload file Word & AI tự động phân loại
  const handleProcessWordFile = async (file: File) => {
    const fileNameLower = file.name.toLowerCase();
    if (!fileNameLower.endsWith('.docx') && !fileNameLower.endsWith('.doc')) {
      alert('Vui lòng chọn file Word có định dạng .docx');
      return;
    }

    setWordFile(file);
    setIsProcessingWord(true);
    setAiNotice(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/knowledge/import-word', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Không thể xử lý file Word.');
      }

      const { title: aiTitle, category: aiCategory, tags, content: text, fileName } = json.data;
      setTitle(aiTitle || file.name.replace(/\.[^/.]+$/, ''));
      setCategory(aiCategory || 'Tài liệu');
      setContent(text || '');
      if (Array.isArray(tags) && tags.length > 0) {
        setTagsInput(tags.join(', '));
      }
      setSourceType('DOCX');
      setSourceName(fileName || file.name);
      setAiNotice(`AI đã tự động phân tích & phân loại vào danh mục "${aiCategory}"`);
    } catch (err: any) {
      alert(`Lỗi import file Word: ${err.message}`);
      setWordFile(null);
    } finally {
      setIsProcessingWord(false);
    }
  };

  // AI tự động phân loại từ văn bản đang nhập (nếu paste tay)
  const handleAiClassifyText = async () => {
    if (!content || content.trim().length < 10) {
      alert('Vui lòng nhập ít nhất 10 ký tự nội dung trước khi yêu cầu AI phân loại.');
      return;
    }

    setIsClassifyingText(true);
    setAiNotice(null);

    try {
      const res = await fetch('/api/admin/knowledge/import-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          fileName: title || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'AI không thể phân loại.');
      }

      const { title: aiTitle, category: aiCategory, tags } = json.data;
      if (!title && aiTitle) setTitle(aiTitle);
      if (aiCategory) setCategory(aiCategory);
      if (Array.isArray(tags) && tags.length > 0) {
        setTagsInput(tags.join(', '));
      }
      setAiNotice(`AI đã phân tích nội dung và phân loại: "${aiCategory}"`);
    } catch (err: any) {
      alert(`Lỗi AI phân loại: ${err.message}`);
    } finally {
      setIsClassifyingText(false);
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/admin/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          content,
          tags: tagsArray,
          sourceType,
          sourceName: sourceName || (sourceType === 'DOCX' ? 'Word Document' : undefined),
          status: 'ACTIVE',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Thêm tài liệu mới thất bại');
      }

      setMessage(`Đã thêm tài liệu "${title}" và tự động sinh Vector Embeddings thành công!`);
      resetAddForm();
      setShowModal(false);
      fetchDocuments();
    } catch (err: any) {
      setMessage(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc || !selectedDoc._id) return;
    setEditSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/knowledge/${selectedDoc._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          content: editContent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Cập nhật tài liệu thất bại');
      }

      setMessage('Đã lưu thay đổi tài liệu và tái sinh Vector Embeddings thành công!');
      setSelectedDoc(data.data);
      setIsEditingDoc(false);
      fetchDocuments();
    } catch (err: any) {
      alert(`Lỗi cập nhật: ${err.message}`);
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDeleteDocument = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Bạn có chắc chắn muốn xóa tài liệu này và toàn bộ Vector Chunks liên quan?')) return;

    try {
      const res = await fetch(`/api/admin/knowledge/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (selectedDoc && selectedDoc._id === id) {
          setSelectedDoc(null);
        }
        fetchDocuments();
      }
    } catch (err) {
      alert('Không thể xóa tài liệu');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            Kho Kiến thức Doanh nghiệp (RAG)
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý tài liệu nguồn. Bạn có thể nhập tài liệu thủ công hoặc **tải lên file Word (.docx) để AI tự động trích xuất và phân loại**.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95"
            title="Tải lên file Word (.docx) để AI tự động đọc và phân loại"
          >
            <FileUp className="w-4.5 h-4.5" /> Import File Word
          </button>

          <button
            onClick={() => handleOpenAddModal(false)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-red-600/25 active:scale-95"
          >
            <Plus className="w-4.5 h-4.5" /> Thêm Tài liệu Mới
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2 shadow-2xs">
          <Sparkles className="w-5 h-5 text-red-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Document List Table */}
      <div className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-red-100 flex items-center justify-between bg-red-50/40">
          <span className="text-sm font-bold text-slate-900">Danh sách Tài liệu ({documents.length})</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium">Đang tải danh sách tài liệu...</div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-red-300" />
            <p className="text-sm font-bold text-slate-800">Chưa có tài liệu kiến thức nào.</p>
            <p className="text-xs text-slate-500">Hãy thêm tài liệu để AI Chatbot trích xuất câu trả lời chuẩn xác.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-4">Tiêu đề tài liệu</th>
                  <th className="p-4">Nguồn</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr
                    key={doc._id?.toString()}
                    onClick={() => openViewDoc(doc)}
                    className="hover:bg-red-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 font-bold text-slate-900 group-hover:text-red-600 transition-colors max-w-md truncate">
                      {doc.title}
                    </td>
                    <td className="p-4">
                      {doc.sourceType === 'DOCX' ? (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold inline-flex items-center gap-1">
                          <FileText className="w-3 h-3 text-blue-600" /> DOCX
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold">
                          {doc.sourceType || 'TEXT'}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                        {doc.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-medium">
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openViewDoc(doc)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                          title="Xem & Chỉnh sửa"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Xem & Sửa
                        </button>
                        <button
                          onClick={(e) => handleDeleteDocument(doc._id!.toString(), e)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Xóa tài liệu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL DOCUMENT VIEWER & EDIT MODAL */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] bg-white border border-red-100 rounded-3xl shadow-2xl flex flex-col text-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-red-100 bg-gradient-to-r from-red-50/80 via-white to-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {isEditingDoc ? 'Chỉnh sửa tài liệu kiến thức' : selectedDoc.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" /> {selectedDoc.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      {selectedDoc.status}
                    </span>
                    {selectedDoc.sourceType === 'DOCX' && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                        File Word
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isEditingDoc ? (
                  <button
                    onClick={() => setIsEditingDoc(true)}
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Sửa nội dung
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingDoc(false)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Hủy sửa
                  </button>
                )}
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: View vs Edit Mode */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/50">
              {!isEditingDoc ? (
                /* VIEW MODE */
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày tạo:{' '}
                      {selectedDoc.createdAt ? new Date(selectedDoc.createdAt).toLocaleString('vi-VN') : 'N/A'}
                    </span>
                    {selectedDoc.sourceName && <span>Nguồn: {selectedDoc.sourceName}</span>}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
                    <h5 className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      Nội dung tài liệu nguyên bản:
                    </h5>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm text-slate-800 font-normal">
                      {selectedDoc.content}
                    </p>
                  </div>
                </div>
              ) : (
                /* EDIT FORM MODE */
                <form onSubmit={handleUpdateDocument} id="edit-doc-form" className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tiêu đề tài liệu <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Danh mục phân loại <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nội dung tài liệu nguyên bản <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={10}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none leading-relaxed"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteDocument(selectedDoc._id!.toString())}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Xóa tài liệu này
              </button>

              {isEditingDoc ? (
                <button
                  type="submit"
                  form="edit-doc-form"
                  disabled={editSubmitting}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20 inline-flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  {editSubmitting ? 'Đang lưu & Tạo lại Vector...' : 'Lưu thay đổi & Tái sinh Vector'}
                </button>
              ) : (
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Đóng cửa sổ
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Document with Word Import & AI Classification */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white border border-red-100 rounded-3xl p-6 shadow-2xl relative text-slate-800 flex flex-col my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Thêm Tài liệu Kiến thức Mới</h3>
                  <p className="text-xs text-slate-500">Nhập trực tiếp hoặc tải file Word để AI tự động phân loại</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-4 custom-scrollbar">
              {/* WORD FILE UPLOAD DROPZONE */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Nhập nhanh từ File Word (.docx)
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleProcessWordFile(file);
                  }}
                />

                {!wordFile ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleProcessWordFile(file);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/60 scale-[0.99]'
                        : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/80 bg-slate-50/40'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Bấm để chọn file Word hoặc kéo thả vào đây
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Định dạng <span className="font-semibold text-blue-600">.docx</span>. AI sẽ tự động đọc nội dung, đặt tiêu đề và phân loại danh mục.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 max-w-sm truncate">{wordFile.name}</span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                            {(wordFile.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <p className="text-xs text-blue-700 font-medium mt-0.5">
                          Đã trích xuất nội dung từ file Word thành công
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setWordFile(null);
                        setSourceType('TEXT');
                        setSourceName('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100/60 rounded-lg transition-colors"
                    >
                      Đổi file khác
                    </button>
                  </div>
                )}

                {/* Loading state for Word processing */}
                {isProcessingWord && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-semibold animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                    <span>Đang đọc nội dung file Word và AI đang phân tích, tự động phân loại danh mục...</span>
                  </div>
                )}

                {/* AI Notification Banner */}
                {aiNotice && !isProcessingWord && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-semibold shadow-2xs">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="flex-1">{aiNotice}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px]">Đã tự điền</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleCreateDocument} id="create-knowledge-form" className="space-y-3.5 pt-1">
                {/* Tiêu đề tài liệu */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tiêu đề tài liệu <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Quy định bảo hành sản phẩm năm 2026"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                {/* Danh mục phân loại & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Danh mục phân loại <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Chính sách, Dịch vụ & Công nghệ, Quy trình & Báo giá..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thẻ nhãn (Tags - phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="bảo hành, đổi trả, quy định..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                </div>

                {/* Nội dung tài liệu */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Nội dung tài liệu nguyên bản <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      disabled={isClassifyingText || !content || content.length < 10}
                      onClick={handleAiClassifyText}
                      className="text-xs text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="AI đọc nội dung hiện tại và tự động gợi ý Tiêu đề & Danh mục"
                    >
                      {isClassifyingText ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" /> Đang phân loại...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" /> AI tự phân loại từ văn bản
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    required
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập hoặc dán toàn bộ văn bản kiến thức chi tiết tại đây (hoặc tải file Word ở trên để tự điền)..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none font-normal leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                    <span>Số ký tự: {content.length}</span>
                    {sourceType === 'DOCX' && (
                      <span className="text-blue-600 font-medium">Nguồn: File Word ({sourceName})</span>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                form="create-knowledge-form"
                disabled={submitting || isProcessingWord}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/25 disabled:opacity-50 inline-flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang tạo Vector Embeddings...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Lưu & Sinh Vector Embeddings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
