export interface VariantAnalytics {
  sku: string;
  title: string;
  variant: string;
  returnCount: number;
  reasons: { [key: string]: number };
  mostCommonReason: string;
}

export interface DashboardData {
  totalReturns: number;
  topReturnReason: string;
  topReturnReasonCount: number;
  mostProblematicProduct: string;
  mostProblematicProductCount: number;
  affectedProducts: number;
  criticalProducts: number;
}

export interface Insight {
  id: string;
  sku: string;
  title: string;
  variant: string;
  insight: string;
  note: string;
  createdAt: string;
}

export interface CreateInsightData {
  sku: string;
  title: string;
  variant: string;
  insight: string;
  note: string;
}
