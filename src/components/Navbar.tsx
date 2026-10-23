import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Sun,
  Moon,
  Globe,
  BookOpen,
  MessageSquare,
  Settings,
  Download,
  Upload,
  RotateCcw,
  Check,
  User,
  Crown,
  Briefcase,
  Layers,
  Users,
} from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
  onOpenAuth: () => void;
  onOpenIndustry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDocs,
  onOpenAuth,
  onOpenIndustry,
}) => {
  const {
    t,
    theme,
    toggleTheme,
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    exportStateJson,
    importStateJson,
    resetToDemo,
    currentUser,
    state,
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [dataMenuOpen, setDataMenuOpen] = useState(false);

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'uz-latn', label: "O'zbekcha", script: 'Lotin' },
    { code: 'uz-cyrl', label: 'Ўзбекча', script: 'Кирилл' },
    { code: 'ru', label: 'Русский', script: 'Кириллица' },
    { code: 'en', label: 'English', script: 'Latin' },
  ];

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importStateJson(content);
        if (success) {
          setDataMenuOpen(false);
        } else {
          alert('Failed to parse JSON backup file.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const isBoss = currentUser?.role === 'boshliq';
  const isStaff = currentUser?.role === 'ishchi';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-black/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2">
        {/* Brand & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div
            onClick={() => setActiveTab('chat')}
            className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-85 shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black shadow-sm">
              {isBoss ? (
                <Crown className="h-4 w-4" />
              ) : (
                <span className="text-xs font-bold tracking-tighter">AD</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-black dark:text-white leading-tight">
                {state.companyProfile.name || t.appName}
              </span>
              <span className="hidden text-[10px] text-neutral-500 dark:text-neutral-400 sm:inline-block truncate max-w-[140px]">
                {state.companyProfile.industry || 'Enterprise Network'}
              </span>
            </div>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-100 p-0.5 sm:p-1 dark:border-neutral-800 dark:bg-neutral-900 shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                  : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">{t.customerChat}</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                  : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">{t.adminPanel}</span>
            </button>
          </div>

          {/* Industry / Network Selector Button */}
          <button
            onClick={onOpenIndustry}
            className="hidden md:flex items-center gap-1.5 rounded-xl border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors shrink-0"
            title={t.chooseIndustry}
          >
            <Layers className="h-3.5 w-3.5 text-neutral-400" />
            <span className="max-w-[130px] truncate">{t.chooseIndustry}</span>
          </button>
        </div>

        {/* Right Action Controls: User Profile + Language + Theme + Help */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* User Identity & Role Badge */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-black hover:border-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:border-white transition-all shadow-sm"
            title={`${t.switchUser} (${currentUser.name})`}
          >
            {isBoss ? (
              <Crown className="h-3.5 w-3.5 text-black dark:text-white" />
            ) : isStaff ? (
              <Briefcase className="h-3.5 w-3.5 text-neutral-500" />
            ) : (
              <User className="h-3.5 w-3.5 text-neutral-400" />
            )}
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs truncate max-w-[110px] sm:max-w-[140px] leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
                {isBoss ? t.bossBadge : isStaff ? t.staffBadge : t.customerBadge}
              </span>
            </div>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setDataMenuOpen(false);
              }}
              className="flex items-center gap-1 rounded-xl border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
              title="Change Language"
            >
              <Globe className="h-3.5 w-3.5 text-neutral-500" />
              <span className="uppercase font-mono text-[11px]">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl transition-all dark:border-neutral-800 dark:bg-neutral-950 z-50">
                <div className="px-3 py-1.5 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  {t.language}
                </div>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                      language === item.code
                        ? 'bg-neutral-100 font-semibold text-black dark:bg-neutral-900 dark:text-white'
                        : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900/60'
                    }`}
                  >
                    <div>
                      <div>{item.label}</div>
                      <div className="text-[10px] text-neutral-400">{item.script}</div>
                    </div>
                    {language === item.code && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
            title={theme === 'light' ? t.darkMode : t.lightMode}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'light' ? (
              <Moon className="h-3.5 w-3.5 text-black" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-white" />
            )}
          </button>

          {/* Documentation Modal Trigger */}
          <button
            onClick={onOpenDocs}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{t.help}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
