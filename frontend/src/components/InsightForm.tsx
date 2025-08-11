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
  const [isCustomInsight, setIsCustomInsight] = useState(false);

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

  const handleInsightChange = (value: string) => {
    setInsight(value);
    setIsCustomInsight(false);
  };

  const handleCustomInsightChange = (value: string) => {
    setInsight(value);
    setIsCustomInsight(value.trim() !== '');
  };

  const generateSuggestedInsights = () => {
    if (!variant) return [];
    
    // Extract size and color from variant string
    const [size, _ ] = variant.variant.split(' / ');
    const totalReturns = variant.returnCount;
    const mainReason = variant.mostCommonReason;
    const mainReasonCount = variant.reasons[mainReason] || 0;
    
    const suggestions = [
      // 1. Percentage-based insight (most actionable)
      `${Math.round((mainReasonCount / totalReturns) * 100)}% of returns due to "${mainReason}" (${mainReasonCount}/${totalReturns})`,
      
      // 2. Size-specific recommendation (if applicable)
      size && ['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size) 
        ? `Size ${size} appears ${mainReason?.toLowerCase().includes('large') ? 'too large' : mainReason?.toLowerCase().includes('small') ? 'too small' : 'problematic'} - review sizing`
        : `High return volume: ${totalReturns} returns - investigate quality issues`,
      
      // 3. Action-oriented insight
      totalReturns > 15 
        ? `Critical: ${totalReturns} returns require immediate attention - check product quality and sizing`
        : `Monitor: ${totalReturns} returns suggest potential issues with ${mainReason?.toLowerCase()}`,
      
      // 4. Business impact insight
      `Variant ${variant.sku} (${variant.variant}) - ${totalReturns} returns affecting inventory and customer satisfaction`
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
              value={isCustomInsight ? "" : insight}
              onChange={(e) => handleInsightChange(e.target.value)}
              disabled={isCustomInsight}
            >
              <option value="">Select a suggested insight...</option>
              {generateSuggestedInsights().map((suggestion, index) => (
                <option key={index} value={suggestion}>{suggestion}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter custom insight..."
              value={insight}
              onChange={(e) => handleCustomInsightChange(e.target.value)}
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
