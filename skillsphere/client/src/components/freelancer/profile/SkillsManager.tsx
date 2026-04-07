import React, { useState } from 'react';
import { Plus, X, TrendingUp } from 'lucide-react';
import PremiumButton from '../shared/PremiumButton';

interface Skill {
  id?: string;
  name: string;
  proficiency: number;
  endorsements?: number;
  yearsExperience?: number;
}

interface SkillsManagerProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  readOnly?: boolean;
  onSave?: (skills: Skill[]) => Promise<void>;
}

const SkillsManager: React.FC<SkillsManagerProps> = ({ 
  skills, 
  onChange, 
  readOnly = false,
  onSave 
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newProficiency, setNewProficiency] = useState(75);
  const [saving, setSaving] = useState(false);

  const addSkill = async () => {
    if (newSkill.trim()) {
      const updatedSkills = [
        ...skills,
        {
          id: Date.now().toString(),
          name: newSkill.trim(),
          proficiency: newProficiency,
          endorsements: 0,
          yearsExperience: 0,
        },
      ];
      onChange(updatedSkills);
      
      if (onSave) {
        setSaving(true);
        try {
          await onSave(updatedSkills);
        } catch (error) {
          console.error('Error saving skill:', error);
        } finally {
          setSaving(false);
        }
      }
      
      setNewSkill('');
      setNewProficiency(75);
    }
  };

  const removeSkill = async (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onChange(updatedSkills);
    
    if (onSave) {
      setSaving(true);
      try {
        await onSave(updatedSkills);
      } catch (error) {
        console.error('Error removing skill:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const updateSkill = async (index: number, field: keyof Skill, value: any) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
    
    if (onSave && !readOnly) {
      setSaving(true);
      try {
        await onSave(updated);
      } catch (error) {
        console.error('Error updating skill:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {skills.length === 0 ? (
          <p className="text-slate-500 text-sm italic">No skills added yet</p>
        ) : (
          skills.map((skill, idx) => (
            <div key={skill.id || idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">{skill.name}</h4>
                  {skill.endorsements && skill.endorsements > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                      <TrendingUp size={12} /> {skill.endorsements} endorsements
                    </span>
                  )}
                </div>

                {!readOnly && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-slate-700">
                        Proficiency: {skill.proficiency}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => updateSkill(idx, 'proficiency', Number(e.target.value))}
                        disabled={saving}
                        className="w-full h-2 bg-slate-200 rounded-lg placeholder:text-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={skill.yearsExperience || 0}
                          onChange={(e) => updateSkill(idx, 'yearsExperience', Number(e.target.value))}
                          disabled={saving}
                          className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Endorsements
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={skill.endorsements || 0}
                          onChange={(e) => updateSkill(idx, 'endorsements', Number(e.target.value))}
                          disabled={saving}
                          className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </>
                )}

                {readOnly && (
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Proficiency: <span className="font-semibold text-slate-900">{skill.proficiency}%</span></span>
                    {skill.yearsExperience && <span>{skill.yearsExperience} years exp.</span>}
                  </div>
                )}
              </div>

              {!readOnly && (
                <button
                  onClick={() => removeSkill(idx)}
                  disabled={saving}
                  className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {!readOnly && (
        <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200 space-y-3">
          <p className="text-sm font-semibold text-slate-900">Add a new skill</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., React, UI Design, Project Management"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              disabled={saving}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg placeholder:text-gray-700 text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <input
              type="number"
              min="0"
              max="100"
              value={newProficiency}
              onChange={(e) => setNewProficiency(Number(e.target.value))}
              disabled={saving}
              className="w-20 px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              placeholder="%"
            />
            <PremiumButton onClick={addSkill} variant="primary" disabled={saving}>
              <Plus size={18} />
            </PremiumButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;