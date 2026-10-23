import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, CheckCircle2, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillMessage?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  prefillMessage = '',
}) => {
  const { t, addLead } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(prefillMessage);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    addLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      message: message.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-black dark:text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.leadSuccess}</h3>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight">
                  {t.leadModalTitle}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {t.leadModalDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    <User className="h-3.5 w-3.5" />
                    <span>{t.leadName} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aziz Rakhimov"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{t.leadPhone} *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{t.leadEmail}</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{t.leadMessage} *</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or request..."
                    className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-2xl border border-neutral-200 px-5 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-2xl bg-black px-6 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.submitLead}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
