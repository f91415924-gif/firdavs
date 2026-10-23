import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQItem, FreeTextSection } from '../../types';
import { parseUploadedFile } from '../../utils/fileParser';
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  FileText,
  Upload,
  Check,
  X,
  FileCheck,
} from 'lucide-react';

export const KnowledgeBaseManager: React.FC = () => {
  const {
    state,
    t,
    addFaq,
    editFaq,
    deleteFaq,
    addFreeText,
    editFreeText,
    deleteFreeText,
    addDocument,
    deleteDocument,
  } = useApp();

  const { knowledgeBase } = state;

  const [activeSection, setActiveSection] = useState<'faqs' | 'freetext' | 'documents'>('faqs');
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ modal state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('');

  // FreeText modal state
  const [isFreeTextModalOpen, setIsFreeTextModalOpen] = useState(false);
  const [editingFreeTextId, setEditingFreeTextId] = useState<string | null>(null);
  const [freeTextTitle, setFreeTextTitle] = useState('');
  const [freeTextContent, setFreeTextContent] = useState('');
  const [freeTextCategory, setFreeTextCategory] = useState<FreeTextSection['category']>('prices');

  // File upload state
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Filtered FAQs
  const filteredFaqs = (knowledgeBase.faqs || []).filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAddFaq = () => {
    setEditingFaqId(null);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqCategory('general');
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FAQItem) => {
    setEditingFaqId(faq.id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqCategory(faq.category || 'general');
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    if (editingFaqId) {
      editFaq(editingFaqId, {
        question: faqQuestion.trim(),
        answer: faqAnswer.trim(),
        category: faqCategory.trim() || 'general',
      });
    } else {
      addFaq({
        question: faqQuestion.trim(),
        answer: faqAnswer.trim(),
        category: faqCategory.trim() || 'general',
      });
    }

    setIsFaqModalOpen(false);
  };

  const handleOpenAddFreeText = () => {
    setEditingFreeTextId(null);
    setFreeTextTitle('');
    setFreeTextContent('');
    setFreeTextCategory('prices');
    setIsFreeTextModalOpen(true);
  };

  const handleOpenEditFreeText = (item: FreeTextSection) => {
    setEditingFreeTextId(item.id);
    setFreeTextTitle(item.title);
    setFreeTextContent(item.content);
    setFreeTextCategory(item.category);
    setIsFreeTextModalOpen(true);
  };

  const handleSaveFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTextTitle.trim() || !freeTextContent.trim()) return;

    if (editingFreeTextId) {
      editFreeText(editingFreeTextId, {
        title: freeTextTitle.trim(),
        content: freeTextContent.trim(),
        category: freeTextCategory,
      });
    } else {
      addFreeText({
        title: freeTextTitle.trim(),
        content: freeTextContent.trim(),
        category: freeTextCategory,
      });
    }

    setIsFreeTextModalOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(t.extractingText);
    try {
      const parsed = await parseUploadedFile(file);
      addDocument({
        filename: parsed.filename,
        size: parsed.size,
        extractedText: parsed.extractedText,
      });

      // Also automatically create a free-text knowledge section from this doc
      addFreeText({
        title: `Doc: ${parsed.filename}`,
        content: parsed.extractedText,
        category: 'custom',
      });

      setUploadStatus(t.docsExtracted);
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (err: any) {
      setUploadStatus('Failed to extract: ' + err.message);
      setTimeout(() => setUploadStatus(null), 4000);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header with Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
            {t.tabKnowledge}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Official facts, FAQs, prices, and documentation used strictly by AskDesk to answer queries.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center rounded-2xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
          <button
            onClick={() => setActiveSection('faqs')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'faqs'
                ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            FAQs ({knowledgeBase.faqs?.length || 0})
          </button>
          <button
            onClick={() => setActiveSection('freetext')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'freetext'
                ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Policies & Prices ({knowledgeBase.freeTexts?.length || 0})
          </button>
          <button
            onClick={() => setActiveSection('documents')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'documents'
                ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Files ({knowledgeBase.documents?.length || 0})
          </button>
        </div>
      </div>

      {/* SECTION 1: FAQs */}
      {activeSection === 'faqs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-2 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
              />
            </div>

            <button
              onClick={handleOpenAddFaq}
              className="flex items-center gap-1.5 rounded-2xl bg-black px-4 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-white dark:text-black shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>{t.addFaq}</span>
            </button>
          </div>

          {/* FAQs List */}
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
              <p className="text-sm text-neutral-500">{t.noFaqsFound}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="group rounded-3xl border border-neutral-200 bg-white p-5 transition-all hover:border-black dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-400">
                          #{index + 1}
                        </span>
                        {faq.category && (
                          <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-black dark:text-white leading-snug">
                        {faq.question}
                      </h4>
                      <p className="whitespace-pre-wrap text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEditFaq(faq)}
                        className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
                        title={t.edit}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(t.delete + '?')) deleteFaq(faq.id);
                        }}
                        className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
                        title={t.delete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: POLICIES & FREE TEXT */}
      {activeSection === 'freetext' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t.freeTextDesc}
            </p>
            <button
              onClick={handleOpenAddFreeText}
              className="flex items-center gap-1.5 rounded-2xl bg-black px-4 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
            >
              <Plus className="h-4 w-4" />
              <span>{t.addSection}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(knowledgeBase.freeTexts || []).map((sec) => (
              <div
                key={sec.id}
                className="group flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-5 transition-all hover:border-black dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600 shadow-sm"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                      {sec.category}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      Updated {sec.updatedAt}
                    </span>
                  </div>
                  <h4 className="mb-2 text-sm font-bold text-black dark:text-white">
                    {sec.title}
                  </h4>
                  <p className="line-clamp-6 whitespace-pre-wrap text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {sec.content}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-1 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenEditFreeText(sec)}
                    className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
                    title={t.edit}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(t.delete + '?')) deleteFreeText(sec.id);
                    }}
                    className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
                    title={t.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: DOCUMENTS */}
      {activeSection === 'documents' && (
        <div className="space-y-6">
          {/* Upload Drop Zone */}
          <div className="relative rounded-3xl border-2 border-dashed border-neutral-300 p-8 text-center hover:border-black dark:border-neutral-700 dark:hover:border-white transition-colors">
            <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
            <h4 className="text-sm font-bold text-black dark:text-white mb-1">
              {t.docUploadTitle}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              {t.dropFileHere}
            </p>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-black px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-sm">
              <Upload className="h-3.5 w-3.5" />
              <span>{t.uploadDocBtn}</span>
              <input
                type="file"
                accept=".txt,.md,.csv,.json,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {uploadStatus && (
              <div className="mt-3 text-xs font-medium text-black dark:text-white">
                {uploadStatus}
              </div>
            )}
          </div>

          {/* Uploaded Documents List */}
          <div className="space-y-3">
            {(knowledgeBase.documents || []).map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  <div>
                    <div className="text-xs font-semibold text-black dark:text-white">
                      {doc.filename}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {(doc.size / 1024).toFixed(1)} KB · {doc.uploadedAt}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(t.delete + '?')) deleteDocument(doc.id);
                  }}
                  className="rounded-xl p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  title={t.delete}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ ADD / EDIT MODAL */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-black dark:text-white">
                {editingFaqId ? t.editFaq : t.addFaq}
              </h3>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.questionLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. Do you deliver on weekends?"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.sectionCategory}
                </label>
                <input
                  type="text"
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  placeholder="e.g. delivery, menu, hours"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.answerLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Official answer that the AI must strictly rely upon..."
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-2xl bg-black px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-md"
                >
                  <Check className="h-4 w-4" />
                  <span>{t.saveChanges}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FREE TEXT ADD / EDIT MODAL */}
      {isFreeTextModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-black dark:text-white">
                {editingFreeTextId ? 'Edit Section' : t.addSection}
              </h3>
              <button
                onClick={() => setIsFreeTextModalOpen(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFreeText} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.sectionTitle} *
                </label>
                <input
                  type="text"
                  required
                  value={freeTextTitle}
                  onChange={(e) => setFreeTextTitle(e.target.value)}
                  placeholder="e.g. Return Policy & Warranty Terms"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.sectionCategory}
                </label>
                <select
                  value={freeTextCategory}
                  onChange={(e) =>
                    setFreeTextCategory(e.target.value as FreeTextSection['category'])
                  }
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                >
                  <option value="prices">{t.categoryPrices}</option>
                  <option value="delivery">{t.categoryDelivery}</option>
                  <option value="returns">{t.categoryReturns}</option>
                  <option value="policies">{t.categoryPolicies}</option>
                  <option value="custom">{t.categoryCustom}</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.sectionContent} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={freeTextContent}
                  onChange={(e) => setFreeTextContent(e.target.value)}
                  placeholder="Detailed pricing, terms, conditions, bulleted lists..."
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFreeTextModalOpen(false)}
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-2xl bg-black px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-md"
                >
                  <Check className="h-4 w-4" />
                  <span>{t.saveChanges}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
