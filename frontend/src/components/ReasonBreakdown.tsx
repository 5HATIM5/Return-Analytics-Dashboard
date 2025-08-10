import React from 'react';
import { VariantAnalytics } from '../types';

interface Props {
  variant: VariantAnalytics;
}

export const ReasonBreakdown: React.FC<Props> = ({ variant }) => {
  const reasonEntries = Object.entries(variant.reasons).sort(([,a], [,b]) => b - a);
  const total = variant.returnCount;

  return (
    <div className="reason-breakdown">
      <h3>Return Reasons for {variant.title} - {variant.variant}</h3>
      <div className="reason-chart">
        {reasonEntries.map(([reason, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          return (
            <div key={reason} className="reason-item">
              <div className="reason-label">
                <span className="reason-text">{reason}</span>
                <span className="reason-count">({count} returns - {percentage}%)</span>
              </div>
              <div className="reason-bar">
                <div 
                  className="reason-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
