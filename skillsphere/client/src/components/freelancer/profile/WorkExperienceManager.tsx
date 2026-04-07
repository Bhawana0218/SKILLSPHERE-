import React, { useState } from 'react';
import { Plus, X, Calendar, Building } from 'lucide-react';
import PremiumButton from '../shared/PremiumButton';

interface Experience {
  id?: string;
  title: string;
  company: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  isCurrently?: boolean;
}

interface WorkExperienceManagerProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  readOnly?: boolean;
  onSave?: (experiences: Experience[]) => Promise<void>;
}

const WorkExperienceManager: React.FC<WorkExperienceManagerProps> = ({
  experiences,
  onChange,
  readOnly = false,
  onSave
}) => {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Experience>({
    title: '',
    company: '',
    duration: '',
    description: '',
    isCurrently: false,
  });

  const addExperience = async () => {
    if (formData.title && formData.company) {
      const updatedExperiences = [
        ...experiences,
        {
          ...formData,
          id: Date.now().toString(),
        },
      ];
      onChange(updatedExperiences);
      
      if (onSave) {
        setSaving(true);
        try {
          await onSave(updatedExperiences);
        } catch (error) {
          console.error('Error saving experience:', error);
        } finally {
          setSaving(false);
        }
      }
      
      setFormData({ title: '', company: '', duration: '', description: '', isCurrently: false });
      setShowForm(false);
    }
  };

  const removeExperience = async (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    onChange(updatedExperiences);
    
    if (onSave) {
      setSaving(true);
      try {
        await onSave(updatedExperiences);
      } catch (error) {
        console.error('Error removing experience:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const updateExperience = async (index: number, updates: Partial<Experience>) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
    
    if (onSave && !readOnly) {
      setSaving(true);
      try {
        await onSave(updated);
      } catch (error) {
        console.error('Error updating experience:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <p className="text-slate-500 text-sm italic">No work experience added yet</p>
        ) : (
          experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <Building size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-semibold text-slate-900">{exp.title}</h4>
                      {exp.isCurrently && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Currently working
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 font-medium">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      <span>{exp.duration}</span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-600 text-sm pt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>

                {!readOnly && (
                  <button
                    onClick={() => removeExperience(idx)}
                    disabled={saving}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {!readOnly && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <textarea
                    placeholder="Job description"
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(idx, { description: e.target.value })}
                    disabled={saving}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm placeholder:text-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.isCurrently || false}
                      onChange={(e) => updateExperience(idx, { isCurrently: e.target.checked })}
                      disabled={saving}
                      className="w-4 h-4 accent-cyan-500 placeholder:text-gray-700 text-black rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-700">I currently work here</span>
                  </label>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {!readOnly && (
        <div>
          {!showForm ? (
            <PremiumButton onClick={() => setShowForm(true)} variant="outline" fullWidth disabled={saving}>
              <Plus size={18} /> Add work experience
            </PremiumButton>
          ) : (
            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Job title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={saving}
                  className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={saving}
                  className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g., Jan 2020 - Present)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                disabled={saving}
                className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <textarea
                placeholder="Job description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={saving}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCurrently || false}
                  onChange={(e) => setFormData({ ...formData, isCurrently: e.target.checked })}
                  disabled={saving}
                  className="w-4 h-4 accent-cyan-500 placeholder:text-gray-700 text-black rounded cursor-pointer"
                />
                <span className="text-sm text-slate-700">I currently work here</span>
              </label>
              <div className="flex gap-2">
                <PremiumButton onClick={addExperience} variant="primary" fullWidth disabled={saving}>
                  {saving ? 'Saving...' : 'Add experience'}
                </PremiumButton>
                <PremiumButton onClick={() => setShowForm(false)} variant="ghost" fullWidth disabled={saving}>
                  Cancel
                </PremiumButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkExperienceManager;