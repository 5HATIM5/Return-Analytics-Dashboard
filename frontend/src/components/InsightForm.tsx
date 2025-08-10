import React, { useState } from 'react';
import { VariantAnalytics, CreateInsightData } from '../types';

interface Props {
  variant: VariantAnalytics | null;
  onSaveInsight: (insight: CreateInsightData) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const InsightForm: React.FC<Props> = ({ variant, onSaveInsight, onClose, isLoading }) => {
  const [insight, setInsight] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!variant || !insight.trim()) return;

    onSaveInsight({
      sku: variant.sku,
      title: variant.title,
      variant: variant.variant,
      insight: insight.trim(),
      note: note.trim()
    });
  };

  const generateSuggestedInsights = () => {
    if (!variant) return [];
    
    const suggestions = [
      `Variant SKU:${variant.sku} is the most returned item`,
      `Returned ${variant.returnCount} times with reason "${variant.mostCommonReason}"`,
      `High return rate due to ${variant.mostCommonReason.toLowerCase()}`,
      `Size/fit issues detected for ${variant.variant}`
    ];
    
    return suggestions;
  };

  if (!variant) return null;

  return (
    <div className="insight-modal">
      <div className="insight-form">
        <h3>Add Insight for {variant.title} - {variant.variant}</h3>
        
        <div className="variant-info">
          <p><strong>SKU:</strong> {variant.sku}</p>
          <p><strong>Return Count:</strong> {variant.returnCount}</p>
          <p><strong>Most Common Reason:</strong> {variant.mostCommonReason}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="insight">Insight *</label>
            <select 
              id="insight"
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              required
            >
              <option value="">Select or type custom insight...</option>
              {generateSuggestedInsights().map((suggestion, index) => (
                <option key={index} value={suggestion}>{suggestion}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter custom insight..."
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="custom-insight"
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Additional Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any additional observations or notes..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading || !insight.trim()}>
              {isLoading ? 'Saving...' : 'Save Insight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
