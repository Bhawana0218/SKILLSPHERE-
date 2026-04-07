import React, { useState } from 'react';
import { DollarSign} from 'lucide-react';
import PremiumButton from '../shared/PremiumButton';

interface PricingConfig {
  hourlyRate: number;
  minimumHours?: number;
  fixedProjectRate?: boolean;
  projectRateMin?: number;
  projectRateMax?: number;
  milestonePayment?: boolean;
  description?: string;
}

interface PricingManagerProps {
  pricing: PricingConfig;
  onChange: (pricing: PricingConfig) => void;
  readOnly?: boolean;
  onSave?: (pricing: PricingConfig) => Promise<void>;
}

const PricingManager: React.FC<PricingManagerProps> = ({
  pricing,
  onChange,
  readOnly = false,
  onSave
}) => {
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (updates: Partial<PricingConfig>) => {
    const updated = { ...pricing, ...updates };
    onChange(updated);

    if (onSave && !readOnly) {
      setSaving(true);
      try {
        await onSave(updated);
      } catch (error) {
        console.error('Error saving pricing:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-br from-emerald-50 to-cyan-50 rounded-lg p-6 border border-emerald-200">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={20} className="text-emerald-600" />
          <h3 className="font-semibold text-slate-900">Pricing Structure</h3>
        </div>

        <div className="space-y-4">
          {/* Hourly Rate */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-2">
            <label className="block text-sm font-medium text-slate-900">Hourly Rate (₹)</label>
            {!readOnly ? (
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-emerald-600">₹</span>
                <input
                  type="number"
                  min="0"
                  value={pricing.hourlyRate}
                  onChange={(e) => handleUpdate({ hourlyRate: Number(e.target.value) })}
                  disabled={saving}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg placeholder:text-gray-700 text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                  placeholder="Enter hourly rate"
                />
                <span className="text-sm text-slate-600">/hour</span>
              </div>
            ) : (
              <p className="text-lg font-semibold text-emerald-600">₹{pricing.hourlyRate}/hour</p>
            )}
          </div>

          {/* Minimum Hours */}
          {!readOnly && (
            <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-2">
              <label className="block text-sm font-medium text-slate-900">Minimum Hours per Project</label>
              <input
                type="number"
                min="0"
                value={pricing.minimumHours || 0}
                onChange={(e) => handleUpdate({ minimumHours: Number(e.target.value) })}
                disabled={saving}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm placeholder:text-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                placeholder="Optional"
              />
            </div>
          )}

          {/* Fixed Project Rate */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pricing.fixedProjectRate || false}
                onChange={(e) => handleUpdate({ fixedProjectRate: e.target.checked })}
                disabled={saving || readOnly}
                className="w-4 h-4 accent-cyan-500 rounded  placeholder:text-gray-700 text-black cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-900">I also offer fixed project rates</span>
            </label>

            {pricing.fixedProjectRate && !readOnly && (
              <div className="space-y-2 pl-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Min Project Rate (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={pricing.projectRateMin || 0}
                      onChange={(e) => handleUpdate({ projectRateMin: Number(e.target.value) })}
                      disabled={saving}
                      className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Max Project Rate (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={pricing.projectRateMax || 0}
                      onChange={(e) => handleUpdate({ projectRateMax: Number(e.target.value) })}
                      disabled={saving}
                      className="w-full px-3 py-2 border border-slate-300 placeholder:text-gray-700 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {pricing.fixedProjectRate && readOnly && (
              <div className="text-sm text-slate-600 pl-6">
                ₹{pricing.projectRateMin} - ₹{pricing.projectRateMax}
              </div>
            )}
          </div>

          {/* Milestone Payment */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pricing.milestonePayment || false}
                onChange={(e) => handleUpdate({ milestonePayment: e.target.checked })}
                disabled={saving || readOnly}
                className="w-4 h-4 accent-cyan-500 rounded placeholder:text-gray-700 text-black cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-900">Accept milestone-based payments</span>
            </label>
            <p className="text-xs text-slate-500 mt-2 ml-6">Clients can split payments into milestones</p>
          </div>

          {/* Verification Badge */}
          <div className="bg-linear-to-r from-cyan-100 to-blue-100 rounded-lg p-4 border border-cyan-300 flex items-center gap-3">
            <div className="shrink-0 text-2xl">✓</div>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-slate-900">Verified Freelancer</p>
              <p className="text-slate-600">Your pricing is transparent and trusted by clients</p>
            </div>
          </div>
        </div>
      </div>

      {!readOnly && (
        <PremiumButton
          fullWidth
          variant="primary"
          disabled={saving}
          onClick={async () => {
            if (onSave) {
              setSaving(true);
              try {
                await onSave(pricing);
              } catch (error) {
                console.error('Error saving pricing:', error);
              } finally {
                setSaving(false);
              }
            }
          }}
        >
          {saving ? 'Saving...' : 'Save pricing'}
        </PremiumButton>
      )}
    </div>
  );
};

export default PricingManager;