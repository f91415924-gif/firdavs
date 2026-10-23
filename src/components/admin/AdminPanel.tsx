import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompanyProfileForm } from './CompanyProfileForm';
import { KnowledgeBaseManager } from './KnowledgeBaseManager';
import { BotSettingsForm } from './BotSettingsForm';
import { AnalyticsView } from './AnalyticsView';
import { StaffRoster } from './StaffRoster';
import {
  Building2,
  Database,
  Bot,
  BarChart3,
  Users,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { t } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<
    'profile' | 'knowledge' | 'bot' | 'staff' | 'analytics'
  >('profile');

  const navItems = [
    { id: 'profile' as const, label: t.tabProfile, icon: Building2 },
    { id: 'knowledge' as const, label: t.tabKnowledge, icon: Database },
    { id: 'bot' as const, label: t.tabBotSettings, icon: Bot },
    { id: 'staff' as const, label: t.tabStaff, icon: Users },
    { id: 'analytics' as const, label: t.tabAnalytics, icon: BarChart3 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Admin Tab Switcher */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeAdminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveAdminTab(item.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[600px]">
        {activeAdminTab === 'profile' && <CompanyProfileForm />}
        {activeAdminTab === 'knowledge' && <KnowledgeBaseManager />}
        {activeAdminTab === 'bot' && <BotSettingsForm />}
        {activeAdminTab === 'staff' && <StaffRoster />}
        {activeAdminTab === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  );
};
