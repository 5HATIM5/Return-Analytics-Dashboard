import React from 'react';
import { Insight } from '../types';

interface Props {
  insights: Insight[];
}

export const InsightsList: React.FC<Props> = ({ insights }) => {
  if (insights.length === 0) {
    return (
      <div className="insights-list">
        <h2>Saved Insights</h2>
        <p className="no-insights">No insights saved yet. Add insights from the analytics table above.</p>
      </div>
    );
  }

  return (
    <div className="insights-list">
      <h2>Saved Insights ({insights.length})</h2>
      <div className="insights-grid">
        {insights.map((insight) => (
          <div key={insight.id} className="insight-card">
            <div className="insight-header">
              <h4>{insight.title} - {insight.variant}</h4>
              <span className="insight-sku">SKU: {insight.sku}</span>
            </div>
            <div className="insight-content">
              <p className="insight-text"><strong>Insight:</strong> {insight.insight}</p>
              {insight.note && (
                <p className="insight-note"><strong>Note:</strong> {insight.note}</p>
              )}
            </div>
            <div className="insight-meta">
              <small>Saved on {new Date(insight.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
