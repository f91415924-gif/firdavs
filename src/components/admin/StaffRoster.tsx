import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee } from '../../types';
import {
  Users,
  Plus,
  Trash2,
  Crown,
  CheckCircle,
  Briefcase,
  Phone,
  Mail,
  X,
  Check,
  UserCheck,
} from 'lucide-react';

export const StaffRoster: React.FC = () => {
  const { state, t, addEmployee, updateEmployee, deleteEmployee, loginUser, currentUser } =
    useApp();
  const { employees } = state;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDept, setFormDept] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formStatus, setFormStatus] = useState<Employee['status']>('active');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormRole('');
    setFormDept('Operatsion xizmat');
    setFormEmail('');
    setFormPhone('');
    setFormStatus('active');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setFormName(emp.name);
    setFormRole(emp.roleTitle);
    setFormDept(emp.department);
    setFormEmail(emp.email);
    setFormPhone(emp.phone);
    setFormStatus(emp.status);
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) return;

    if (editingId) {
      updateEmployee(editingId, {
        name: formName.trim(),
        roleTitle: formRole.trim(),
        department: formDept.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        status: formStatus,
      });
    } else {
      addEmployee({
        name: formName.trim(),
        roleTitle: formRole.trim(),
        department: formDept.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        status: formStatus,
        isHead: formName.toLowerCase().includes('firdavs'),
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
              {t.staffDirectoryTitle}
            </h2>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {t.staffDirectoryDesc}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-2xl bg-black px-4 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-white dark:text-black shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>{t.addEmployee}</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-200 bg-neutral-50 p-4 font-semibold text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
            <tr>
              <th className="py-3.5 pl-6">Xodim va Maqomi</th>
              <th className="py-3.5">Bo'lim va Lavozim</th>
              <th className="py-3.5">Aloqa ma'lumotlari</th>
              <th className="py-3.5">Holati</th>
              <th className="py-3.5 pr-6 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
            {employees.map((emp) => {
              const isCurrent = currentUser?.employeeId === emp.id || (emp.isHead && currentUser?.role === 'boshliq');
              return (
                <tr
                  key={emp.id}
                  className={`hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors ${
                    isCurrent ? 'bg-neutral-100/50 dark:bg-neutral-900/60' : ''
                  }`}
                >
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold text-xs ${
                          emp.isHead
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                            : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {emp.isHead ? <Crown className="h-4 w-4" /> : emp.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-black dark:text-white text-sm">
                            {emp.name}
                          </span>
                          {emp.isHead && (
                            <span className="rounded-full bg-black px-2 py-0.5 text-[9px] font-bold text-white dark:bg-white dark:text-black">
                              {t.bossBadge}
                            </span>
                          )}
                          {isCurrent && (
                            <span className="rounded-full border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-[9px] font-semibold text-neutral-600 dark:text-neutral-300">
                              Siz
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          ID: {emp.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="font-medium text-black dark:text-white">
                      {emp.roleTitle}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {emp.department}
                    </div>
                  </td>

                  <td className="py-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-neutral-400" />
                      <span>{emp.phone}</span>
                    </div>
                    {emp.email && (
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <Mail className="h-3 w-3" />
                        <span>{emp.email}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        emp.status === 'active'
                          ? 'border border-neutral-300 bg-neutral-100 text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white'
                          : emp.status === 'on_duty'
                          ? 'border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-300'
                          : 'text-neutral-400'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {emp.status === 'active'
                        ? t.statusActive
                        : emp.status === 'on_duty'
                        ? t.statusOnDuty
                        : t.statusLeave}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => loginUser(emp.name, emp.isHead ? 'boshliq' : 'ishchi', emp.id)}
                        className="rounded-xl border border-neutral-200 px-3 py-1 text-[11px] font-medium text-black hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 transition-colors"
                        title="Bu foydalanuvchi sifatida kirish"
                      >
                        <UserCheck className="inline-block h-3 w-3 mr-1" />
                        <span>Faollashtirish</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(emp)}
                        className="rounded-xl p-1.5 text-neutral-500 hover:text-black dark:hover:text-white"
                        title={t.edit}
                      >
                        {t.edit}
                      </button>

                      {!emp.isHead && (
                        <button
                          onClick={() => {
                            if (confirm(t.delete + '?')) deleteEmployee(emp.id);
                          }}
                          className="rounded-xl p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
                          title={t.delete}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-black dark:text-white">
                {editingId ? 'Xodim ma\'lumotlarini tahrirlash' : t.addEmployee}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.employeeName} *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Masalan: Sardor Rustamov"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.position} *
                </label>
                <input
                  type="text"
                  required
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="Masalan: Katta dasturchi / Menejer"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {t.department} *
                </label>
                <input
                  type="text"
                  required
                  value={formDept}
                  onChange={(e) => setFormDept(e.target.value)}
                  placeholder="Masalan: Texnik ta'minot, Mijozlar xizmati"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+998 90 ..."
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Holati
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  >
                    <option value="active">{t.statusActive}</option>
                    <option value="on_duty">{t.statusOnDuty}</option>
                    <option value="leave">{t.statusLeave}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="email@askdesk.uz"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
