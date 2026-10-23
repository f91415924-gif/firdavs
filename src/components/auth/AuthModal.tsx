import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, Employee } from '../../types';
import {
  ShieldCheck,
  User,
  Users,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Briefcase,
  Crown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t, state, currentUser, loginUser } = useApp();
  const { employees } = state;

  const [inputName, setInputName] = useState(currentUser?.name || '');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser?.role || 'mijoz');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(
    currentUser?.employeeId
  );
  const [activeTab, setActiveTab] = useState<'input' | 'roster'>('input');

  if (!isOpen) return null;

  // Real-time check if name is Firdavs Nematjanov
  const isFirdavs =
    inputName.toLowerCase().trim() === 'firdavs nematjanov' ||
    inputName.toLowerCase().trim() === 'firdavs';

  const handleQuickSelectFirdavs = () => {
    setInputName('Firdavs Nematjanov');
    setSelectedRole('boshliq');
    setSelectedEmployeeId('emp-1');
  };

  const handleSelectEmployee = (emp: Employee) => {
    setInputName(emp.name);
    setSelectedRole(emp.isHead ? 'boshliq' : 'ishchi');
    setSelectedEmployeeId(emp.id);
    setActiveTab('input');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(inputName, isFirdavs ? 'boshliq' : selectedRole, selectedEmployeeId);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-black dark:text-white"
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
              <ShieldCheck className="h-4 w-4" />
              <span>ASKDESK IDENTITY & ROLE ACCESS</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              {t.selectIdentity}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Ism-familiyangizni kiriting yoki ishchilar tablosidan o'z o'rningizni tanlang.
            </p>
          </div>

          {/* Tab Switcher: Manual Input vs Staff Roster */}
          <div className="mb-6 flex rounded-2xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
            <button
              type="button"
              onClick={() => setActiveTab('input')}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'input'
                  ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                  : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{t.enterYourName}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('roster')}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'roster'
                  ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
                  : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>{t.staffDirectoryTitle} ({employees.length})</span>
            </button>
          </div>

          {activeTab === 'input' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input Field */}
              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <span>{t.enterYourName} *</span>
                  <button
                    type="button"
                    onClick={handleQuickSelectFirdavs}
                    className="text-[11px] font-semibold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white underline cursor-pointer"
                  >
                    Firdavs Nematjanov (Boshliq) sifatida to'ldirish
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Masalan: Firdavs Nematjanov"
                  className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                />
              </div>

              {/* Special Recognition Banner if Firdavs Nematjanov */}
              {isFirdavs ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border-2 border-black bg-neutral-100 p-4 dark:border-white dark:bg-neutral-900 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black shadow-sm">
                      <Crown className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black dark:text-white">
                          Firdavs Nematjanov
                        </span>
                        <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                          {t.bossBadge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">
                        {t.firdavsBossNotice}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Select Role if not Firdavs */
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {t.currentRole}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('ishchi')}
                      className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                        selectedRole === 'ishchi'
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="h-4 w-4" />
                        <span className="text-xs font-bold">{t.roleIshchi}</span>
                      </div>
                      <span className="text-[11px] opacity-75">
                        Kompaniya xodimi, operator yoki mutaxassis
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole('mijoz')}
                      className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                        selectedRole === 'mijoz'
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4" />
                        <span className="text-xs font-bold">{t.roleMijoz}</span>
                      </div>
                      <span className="text-[11px] opacity-75">
                        Xizmatlardan foydalanuvchi mijoz
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-neutral-200 px-5 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-2xl bg-black px-6 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shadow-md"
                >
                  <span>Tizimga kirish</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Staff Roster Table */
            <div className="space-y-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Quyidagi ishchilar tablosidan o'zingizni tanlang yoki Firdavs Nematjanov (Boshliq) sifatida kiring:
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800 max-h-96 overflow-y-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                          emp.isHead
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                            : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {emp.isHead ? <Crown className="h-4 w-4" /> : emp.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-black dark:text-white">
                            {emp.name}
                          </span>
                          {emp.isHead && (
                            <span className="rounded-md bg-black px-1.5 py-0.5 text-[9px] font-bold text-white dark:bg-white dark:text-black">
                              {t.bossBadge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {emp.roleTitle} · {emp.department}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="rounded-lg border border-neutral-200 px-2 py-0.5 text-[10px] font-mono dark:border-neutral-800 text-neutral-500">
                        {emp.status === 'active'
                          ? t.statusActive
                          : emp.status === 'on_duty'
                          ? t.statusOnDuty
                          : t.statusLeave}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectEmployee(emp)}
                        className="flex items-center gap-1 rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 dark:bg-white dark:text-black shadow-sm"
                      >
                        <Check className="h-3 w-3" />
                        <span>Tanlash</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
