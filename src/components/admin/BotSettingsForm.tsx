import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BotTone } from '../../types';
import { CustomerChat } from '../chat/CustomerChat';
import {
  Bot,
  MessageSquare,
  Sparkles,
  Sliders,
  Check,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const BotSettingsForm: React.FC = () => {
  const { state, updateBotSettings, t } = useApp();
  const { botSettings } = state;

  const [form, setForm] = useState(botSettings);
  const [saved, setSaved] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(true);

  const handleChange = (field: keyof typeof botSettings, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBotSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
            {t.botSettingsTitle}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {t.botSettingsDesc}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{showLivePreview ? 'Hide Preview' : 'Show Live Preview'}</span>
          </button>

          <button
            onClick={handleSave}
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-black px-6 py-2 text-xs font-medium text-white shadow-md transition-opacity hover:opacity-90 dark:bg-white dark:text-black shrink-0"
          >
            {saved ? <Check className="h-4 w-4" /> : null}
            <span>{saved ? t.savedSuccessfully : t.saveChanges}</span>
          </button>
        </div>
      </div>

      {/* Grid: Form on left, live test preview on right */}
      <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : ''} gap-8`}>
        {/* Form settings */}
        <form
          onSubmit={handleSave}
          className={`space-y-6 ${showLivePreview ? 'lg:col-span-6' : 'max-w-2xl'}`}
        >
          {/* Bot Name */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <Bot className="h-3.5 w-3.5" />
              <span>{t.botName} *</span>
            </label>
            <input
              type="text"
              required
              value={form.botName}
              onChange={(e) => handleChange('botName', e.target.value)}
              placeholder="e.g. CafeBot or AskDesk Assistant"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <Sliders className="h-3.5 w-3.5" />
              <span>{t.botTone}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'formal', label: t.toneFormal },
                  { id: 'friendly', label: t.toneFriendly },
                  { id: 'short', label: t.toneShort },
                ] as { id: BotTone; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleChange('tone', item.id)}
                  className={`rounded-2xl border p-3 text-center text-xs font-medium transition-all ${
                    form.tone === item.id
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Greeting Message */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{t.greetingMessage} *</span>
            </label>
            <textarea
              required
              rows={3}
              value={form.greetingMessage}
              onChange={(e) => handleChange('greetingMessage', e.target.value)}
              placeholder="Welcome! How can I help you today?"
              className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
            />
          </div>

          {/* Fallback Message */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{t.fallbackMessage} *</span>
            </label>
            <p className="mb-2 text-[11px] text-neutral-400">
              Strictly output when a customer asks a question outside your company knowledge base.
            </p>
            <textarea
              required
              rows={4}
              value={form.fallbackMessage}
              onChange={(e) => handleChange('fallbackMessage', e.target.value)}
              placeholder="I apologize, but I do not have verified records on that..."
              className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
            />
          </div>
        </form>

        {/* Live Test Preview Column */}
        {showLivePreview && (
          <div className="lg:col-span-6">
            <div className="sticky top-24 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950 shadow-md">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                    {t.liveBotPreview}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">
                  {t.testYourBot}
                </span>
              </div>

              {/* Embedded Live Chat Widget */}
              <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
                <CustomerChat isEmbeddedPreview={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
