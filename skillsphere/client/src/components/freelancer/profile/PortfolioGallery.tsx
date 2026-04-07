import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import PremiumButton from '../shared/PremiumButton';

interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  technologies?: string[];
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onChange: (items: PortfolioItem[]) => void;
  readOnly?: boolean;
  onSave?: (items: PortfolioItem[]) => Promise<void>;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onChange,
  readOnly = false,
  onSave
}) => {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PortfolioItem>({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');

  const addItem = async () => {
    if (formData.title && formData.imageUrl) {
      const updatedItems = [
        ...items,
        {
          ...formData,
          id: Date.now().toString(),
        },
      ];
      onChange(updatedItems);
      
      if (onSave) {
        setSaving(true);
        try {
          await onSave(updatedItems);
        } catch (error) {
          console.error('Error saving portfolio item:', error);
        } finally {
          setSaving(false);
        }
      }
      
      setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', technologies: [] });
      setTechInput('');
      setShowForm(false);
    }
  };

  const removeItem = async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
    
    if (onSave) {
      setSaving(true);
      try {
        await onSave(updatedItems);
      } catch (error) {
        console.error('Error removing portfolio item:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((_, i) => i !== index) || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <ImageIcon size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No portfolio items yet</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Portfolio' }}
                />
                {!readOnly && (
                  <button
                    onClick={() => removeItem(idx)}
                    disabled={saving}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700 font-medium mt-2"
                  >
                    View project <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {!readOnly && (
        <div>
          {!showForm ? (
            <PremiumButton onClick={() => setShowForm(true)} variant="outline" fullWidth disabled={saving}>
              <Plus size={18} /> Add portfolio item
            </PremiumButton>
          ) : (
            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200 space-y-3">
              <input
                type="text"
                placeholder="Project title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={saving}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg placeholder:text-gray-700 text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <textarea
                placeholder="Project description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={saving}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg  placeholder:text-gray-700 text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                disabled={saving}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm placeholder:text-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <input
                type="text"
                placeholder="Project URL (optional)"
                value={formData.projectUrl || ''}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                disabled={saving}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm placeholder:text-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">Technologies used</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., React, Node.js"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    disabled={saving}
                    onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg placeholder:text-gray-700 text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                  />
                  <PremiumButton onClick={addTechnology} variant="ghost" disabled={saving}>
                    Add
                  </PremiumButton>
                </div>
                {formData.technologies && formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full"
                      >
                        {tech}
                        <button 
                          onClick={() => removeTechnology(i)} 
                          className="hover:text-cyan-900"
                          disabled={saving}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <PremiumButton onClick={addItem} variant="primary" fullWidth disabled={saving}>
                  {saving ? 'Saving...' : 'Add item'}
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

export default PortfolioGallery;