import React, { useState } from 'react';
import { VariantAnalytics } from '../types';

interface Props {
  data: VariantAnalytics[];
  onViewDetails: (variant: VariantAnalytics) => void;
  onAddInsight: (variant: VariantAnalytics) => void;
}

export const VariantAnalyticsTable: React.FC<Props> = ({ data, onViewDetails, onAddInsight }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="analytics-table">
      <h2>Return Analytics by Variant</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Title</th>
              <th>Variant</th>
              <th>Return Count</th>
              <th>Most Common Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((variant) => (
              <tr key={`${variant.sku}-${variant.variant}`}>
                <td>{variant.sku}</td>
                <td>{variant.title}</td>
                <td>{variant.variant}</td>
                <td className="return-count">{variant.returnCount}</td>
                <td className="reason">{variant.mostCommonReason}</td>
                <td>
                  <button 
                    className="insight-btn"
                    onClick={() => onViewDetails(variant)}
                    title="View Details"
                  >
                    Details
                  </button>
                  <button 
                    className="insight-btn"
                    onClick={() => onAddInsight(variant)}
                    style={{ backgroundColor: '#10b981' }}
                    title="Add Insight"
                  >
                    Insight
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="simple-pagination">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 0}
          className="pagination-arrow"
        >
          ← Previous
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button 
          onClick={handleNext} 
          disabled={currentPage >= totalPages - 1}
          className="pagination-arrow"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
