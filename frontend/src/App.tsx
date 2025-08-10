import { useState, useEffect } from 'react';
import { DashboardCards } from './components/DashboardCards';
import { VariantAnalyticsTable } from './components/VariantAnalyticsTable';
import { ReasonBreakdown } from './components/ReasonBreakdown';
import { InsightForm } from './components/InsightForm';
import { InsightsList } from './components/InsightsList';
import { Modal } from './components/Modal';
import { analyticsApi } from './services/api';
import { VariantAnalytics, Insight, CreateInsightData, DashboardData } from './types';
import './App.css';

function App() {
  const [variantAnalytics, setVariantAnalytics] = useState<VariantAnalytics[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantAnalytics | null>(null);
  const [showInsightForm, setShowInsightForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [analyticsData, insightsData, dashboardData] = await Promise.all([
        analyticsApi.getVariantAnalytics(),
        analyticsApi.getInsights(),
        analyticsApi.getDashboardData()
      ]);
      setVariantAnalytics(analyticsData);
      setInsights(insightsData);
      setDashboardData(dashboardData);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Make sure the backend server is running.');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (variant: VariantAnalytics) => {
    setSelectedVariant(variant);
    setShowDetailsModal(true);
  };

  const handleAddInsight = (variant: VariantAnalytics) => {
    setSelectedVariant(variant);
    setShowInsightForm(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedVariant(null);
  };

  const handleSaveInsight = async (insightData: CreateInsightData) => {
    try {
      setIsLoading(true);
      const newInsight = await analyticsApi.saveInsight(insightData);
      setInsights(prev => [newInsight, ...prev]);
      setShowInsightForm(false);
      setSelectedVariant(null);
    } catch (err) {
      setError('Failed to save insight. Please try again.');
      console.error('Error saving insight:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseInsightForm = () => {
    setShowInsightForm(false);
    setSelectedVariant(null);
  };

  if (isLoading && variantAnalytics.length === 0) {
    return (
      <div className="app">
        <div className="loading">Loading return analytics...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔄 Return Insights Dashboard</h1>
        <p>Analyze return patterns and save insights for better decision making</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={loadData}>Retry</button>
        </div>
      )}

      {dashboardData && <DashboardCards data={dashboardData} />}

      <main className="app-main">
        <div className="analytics-section">
          <VariantAnalyticsTable 
            data={variantAnalytics} 
            onViewDetails={handleViewDetails}
            onAddInsight={handleAddInsight}
          />
        </div>

        <div className="insights-section">
          <InsightsList insights={insights} />
        </div>
      </main>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        title="Return Reason Details"
      >
        {selectedVariant && <ReasonBreakdown variant={selectedVariant} />}
      </Modal>

      {/* Insight Form Modal */}
      {showInsightForm && (
        <InsightForm
          variant={selectedVariant}
          onSaveInsight={handleSaveInsight}
          onClose={handleCloseInsightForm}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
