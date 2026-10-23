import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IndustryType } from '../../types';
import { industryTemplates } from '../../data/demoData';
import {
  Layers,
  Code2,
  Truck,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Landmark,
  Coffee,
  Sparkles,
  Check,
  X,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndustryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndustryModal: React.FC<IndustryModalProps> = ({ isOpen, onClose }) => {
  const { t, state, switchIndustry, updateCompanyProfile } = useApp();
  const { currentIndustry } = state;

  const [customName, setCustomName] = useState(state.companyProfile.name);
  const [customIndustryTitle, setCustomIndustryTitle] = useState(state.companyProfile.industry || '');
  const [customDescription, setCustomDescription] = useState(state.companyProfile.description || '');

  if (!isOpen) return null;

  const industries: {
    id: IndustryType;
    title: string;
    desc: string;
    icon: any;
  }[] = [
    {
      id: 'it',
      title: t.industryIT,
      desc: 'Dasturiy ta\'minot, mobil ilovalar, CRM va AI tizimlar',
      icon: Code2,
    },
    {
      id: 'logistics',
      title: t.industryLogistics,
      desc: 'Avto va avia kargo, yetkazib berish va bojxona',
      icon: Truck,
    },
    {
      id: 'retail',
      title: t.industryRetail,
      desc: 'Do\'konlar tarmog\'i, onlayn savdo va kiyim-kechak',
      icon: ShoppingBag,
    },
    {
      id: 'clinic',
      title: t.industryClinic,
      desc: 'Xususiy klinika, shifokorlar qabuli va laboratoriya',
      icon: Stethoscope,
    },
    {
      id: 'education',
      title: t.industryEducation,
      desc: 'IELTS, IT akademiyasi va xalqaro universitetlar',
      icon: GraduationCap,
    },
    {
      id: 'finance',
      title: t.industryFinance,
      desc: 'Fintex, mikrokredit, faktoring va investitsiyalar',
      icon: Landmark,
    },
    {
      id: 'cafe',
      title: t.industryCafe,
      desc: 'Restoran, kafe va maxsus qahva xizmati',
      icon: Coffee,
    },
    {
      id: 'custom',
      title: t.customNetwork,
      desc: 'O\'zingiz xohlagan har qanday tashkilot yoki tarmoq',
      icon: Building,
    },
  ];

  const handleSelectIndustry = (id: IndustryType) => {
    switchIndustry(id);
    onClose();
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile({
      name: customName,
      industry: customIndustryTitle,
      description: customDescription,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-black dark:text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              <Layers className="h-4 w-4" />
              <span>INDUSTRY & NETWORK CONFIGURATION</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              {t.chooseIndustry}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {t.networkDefinePrompt}
            </p>
          </div>

          {/* Grid of Industry Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {industries.map((item) => {
              const Icon = item.icon;
              const isSelected = currentIndustry === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectIndustry(item.id)}
                  className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-black bg-neutral-100 text-black dark:border-white dark:bg-neutral-900 dark:text-white shadow-sm'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{item.title}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Industry Definition Form */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
            <h4 className="text-xs font-bold text-black dark:text-white mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>O'zingiz istagan tarmoq nomini kiritish:</span>
            </h4>
            <form onSubmit={handleSaveCustom} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Kompaniya nomi (Masalan: Smart Cargo & Delivery)"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                />
                <input
                  type="text"
                  value={customIndustryTitle}
                  onChange={(e) => setCustomIndustryTitle(e.target.value)}
                  placeholder="Tarmoq / Soha (Masalan: Xalqaro logistika)"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                />
              </div>
              <textarea
                rows={2}
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Kompaniya haqida qisqacha tavsif..."
                className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-medium text-white hover:opacity-90 dark:bg-white dark:text-black shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{t.applyNetwork}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
