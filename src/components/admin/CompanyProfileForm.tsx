import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Clock,
  Phone,
  MapPin,
  Globe,
  Upload,
  Check,
  Trash2,
  FileText,
} from 'lucide-react';

export const CompanyProfileForm: React.FC = () => {
  const { state, updateCompanyProfile, t } = useApp();
  const { companyProfile } = state;

  const [form, setForm] = useState(companyProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof typeof companyProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setForm((prev) => ({ ...prev, logo: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
            {t.tabProfile}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Define your official corporate profile used as grounded context by the AI chatbot.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-2xl bg-black px-6 py-2.5 text-xs font-medium text-white shadow-md transition-opacity hover:opacity-90 dark:bg-white dark:text-black shrink-0"
        >
          {saved ? <Check className="h-4 w-4" /> : null}
          <span>{saved ? t.savedSuccessfully : t.saveChanges}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Company Name */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <Building2 className="h-3.5 w-3.5" />
            <span>{t.companyName} *</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Working Hours */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <Clock className="h-3.5 w-3.5" />
            <span>{t.workingHours} *</span>
          </label>
          <input
            type="text"
            required
            value={form.workingHours}
            onChange={(e) => handleChange('workingHours', e.target.value)}
            placeholder="Mon - Sun: 09:00 - 22:00"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <Phone className="h-3.5 w-3.5" />
            <span>{t.phone} *</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+998 71 200 44 88"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <Globe className="h-3.5 w-3.5" />
            <span>{t.website}</span>
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://company.com"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Physical Address */}
        <div className="md:col-span-2">
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <MapPin className="h-3.5 w-3.5" />
            <span>{t.address} *</span>
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Street address, City, Country"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Company Description */}
        <div className="md:col-span-2">
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <FileText className="h-3.5 w-3.5" />
            <span>{t.companyDescription}</span>
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Explain what the company does, products offered, specialties..."
            className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
          />
        </div>

        {/* Logo Upload (monochrome display) */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {t.companyLogo} (B&W Filtered Display)
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-neutral-300 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden shadow-inner">
              {form.logo ? (
                <img
                  src={form.logo}
                  alt="Company Logo"
                  className="h-full w-full object-contain filter grayscale contrast-125"
                />
              ) : (
                <Building2 className="h-8 w-8 text-neutral-400" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-black hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 transition-colors shadow-sm">
                <Upload className="h-3.5 w-3.5" />
                <span>{t.uploadLogo}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {form.logo && (
                <button
                  type="button"
                  onClick={() => handleChange('logo', '')}
                  className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 p-2 text-xs text-neutral-500 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  title={t.removeLogo}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
