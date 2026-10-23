import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportToCSV } from '../../utils/fileParser';
import {
  MessageSquare,
  Users,
  ThumbsUp,
  HelpCircle,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  X,
  Send,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    state,
    t,
    updateLeadStatus,
    deleteLead,
    addFaq,
    markQuestionAnswered,
  } = useApp();

  const {
    chatsCount,
    messagesCount,
    likesCount,
    dislikesCount,
    dailyStats,
    leads,
    unansweredQuestions,
  } = state;

  // Modal for one-click adding unanswered question to KB
  const [activeUnansweredId, setActiveUnansweredId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');
  const [questionText, setQuestionText] = useState('');

  const totalFeedback = likesCount + dislikesCount;
  const satisfactionRate =
    totalFeedback > 0 ? Math.round((likesCount / totalFeedback) * 100) : 95;

  const handleExportLeads = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Message', 'Status', 'Date'];
    const rows = leads.map((l) => [
      l.id,
      l.name,
      l.phone,
      l.email || '',
      l.message,
      l.status,
      new Date(l.timestamp).toLocaleString(),
    ]);
    exportToCSV(`askdesk_leads_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  const handleExportUnanswered = () => {
    const headers = ['ID', 'Question', 'Count', 'Added to FAQ', 'Date'];
    const rows = unansweredQuestions.map((q) => [
      q.id,
      q.question,
      q.count,
      q.addedToKB ? 'Yes' : 'No',
      new Date(q.timestamp).toLocaleString(),
    ]);
    exportToCSV(`askdesk_unanswered_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  const handleOpenAddAnswer = (id: string, question: string) => {
    setActiveUnansweredId(id);
    setQuestionText(question);
    setAnswerDraft('');
  };

  const handleSaveAnswerToKB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !answerDraft.trim()) return;

    addFaq({
      question: questionText.trim(),
      answer: answerDraft.trim(),
      category: 'resolved',
    });

    if (activeUnansweredId) {
      markQuestionAnswered(activeUnansweredId);
    }

    setActiveUnansweredId(null);
    setAnswerDraft('');
    setQuestionText('');
  };

  // Find max chats for bar chart scaling
  const maxChats = Math.max(...dailyStats.map((d) => d.chats), 1);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
          {t.analyticsTitle}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Track customer query trends, satisfaction ratings, and callback requests.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-medium">{t.totalChats}</span>
            <MessageSquare className="h-4 w-4" />
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-black dark:text-white">
            {chatsCount}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-medium">{t.totalMessages}</span>
            <MessageSquare className="h-4 w-4" />
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-black dark:text-white">
            {messagesCount}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-medium">{t.satisfactionRate}</span>
            <ThumbsUp className="h-4 w-4" />
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-black dark:text-white">
            {satisfactionRate}%
          </div>
          <div className="mt-1 text-[11px] text-neutral-400">
            {likesCount} up · {dislikesCount} down
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-medium">{t.unansweredCount}</span>
            <HelpCircle className="h-4 w-4" />
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-black dark:text-white">
            {unansweredQuestions.filter((q) => !q.addedToKB).length}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-medium">{t.leadsCount}</span>
            <Users className="h-4 w-4" />
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-black dark:text-white">
            {leads.length}
          </div>
        </div>
      </div>

      {/* Grayscale Bar & Line Chart: Weekly Activity */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white">
              {t.chatsTrend}
            </h3>
            <p className="text-xs text-neutral-400">
              Daily customer conversations and message engagement
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-black dark:bg-white" />
              <span>Chats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-neutral-300 dark:bg-neutral-700" />
              <span>Satisfaction (%)</span>
            </div>
          </div>
        </div>

        {/* Minimalist Monochrome Chart */}
        <div className="h-56 w-full pt-4">
          <div className="flex h-44 items-end justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            {dailyStats.map((item, idx) => {
              const heightPercent = Math.round((item.chats / maxChats) * 100);
              return (
                <div key={idx} className="flex flex-1 flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-mono tabular-nums text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.chats}
                  </div>
                  <div className="flex items-end justify-center w-full max-w-[40px] gap-1 h-full">
                    {/* Bar for chats */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full rounded-t-lg bg-black dark:bg-white transition-all group-hover:opacity-80"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: Human Leads Table */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white">
              {t.leadsTableTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              Users who requested human assistance via the chat widget
            </p>
          </div>

          <button
            onClick={handleExportLeads}
            disabled={leads.length === 0}
            className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.exportCsv}</span>
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-400">
            {t.noLeadsYet}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-medium">
                <tr>
                  <th className="pb-3 pl-2">Name</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Inquiry</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="py-3 pl-2 font-semibold text-black dark:text-white">
                      {lead.name}
                    </td>
                    <td className="py-3 font-mono text-neutral-600 dark:text-neutral-300">
                      <div>{lead.phone}</div>
                      {lead.email && <div className="text-[10px] text-neutral-400">{lead.email}</div>}
                    </td>
                    <td className="py-3 max-w-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">
                      {lead.message}
                    </td>
                    <td className="py-3">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value as any)
                        }
                        className="rounded-xl border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white focus:outline-none"
                      >
                        <option value="new">{t.statusNew}</option>
                        <option value="contacted">{t.statusContacted}</option>
                        <option value="resolved">{t.statusResolved}</option>
                      </select>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-neutral-400 tabular-nums">
                      {new Date(lead.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button
                        onClick={() => {
                          if (confirm(t.delete + '?')) deleteLead(lead.id);
                        }}
                        className="rounded-xl p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
                        title={t.delete}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 3: Unanswered Customer Questions */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white">
              {t.unansweredTableTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              Questions asked by users that could not be verified in the knowledge base
            </p>
          </div>

          <button
            onClick={handleExportUnanswered}
            disabled={unansweredQuestions.length === 0}
            className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.exportCsv}</span>
          </button>
        </div>

        {unansweredQuestions.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-400">
            {t.noUnansweredYet}
          </div>
        ) : (
          <div className="space-y-2.5">
            {unansweredQuestions.map((q) => (
              <div
                key={q.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-black dark:text-white">
                      "{q.question}"
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 tabular-nums">
                      Asked {q.count} time{q.count > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    Last logged: {new Date(q.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {q.addedToKB ? (
                    <span className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>{t.added}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenAddAnswer(q.id, q.question)}
                      className="flex items-center gap-1.5 rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 dark:bg-white dark:text-black shadow-sm"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{t.addToKnowledgeBase}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Answer to KB Modal */}
      {activeUnansweredId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-black dark:text-white">
                {t.addToKnowledgeBase}
              </h3>
              <button
                onClick={() => setActiveUnansweredId(null)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnswerToKB} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Customer Question
                </label>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Verified Company Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  value={answerDraft}
                  onChange={(e) => setAnswerDraft(e.target.value)}
                  placeholder="Enter the official answer. Once saved, AskDesk will immediately start answering customers with this verified fact..."
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveUnansweredId(null)}
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-2xl bg-black px-5 py-2 text-xs font-medium text-white hover:opacity-90 dark:bg-white dark:text-black shadow-md"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Save to Knowledge Base</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
