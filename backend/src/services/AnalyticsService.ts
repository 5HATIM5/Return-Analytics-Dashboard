import {
  ReturnData,
  VariantAnalytics,
  Insight,
  DashboardData,
} from "../models/Analytics.js";
import fs from "fs/promises";
import path from "path";

export class AnalyticsService {
  private returnsDataPath = path.join(process.cwd(), "data", "returns.json");
  private insightsDataPath = path.join(process.cwd(), "data", "insights.json");

  async getReturnData(): Promise<ReturnData[]> {
    try {
      const data = await fs.readFile(this.returnsDataPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading returns data:", error);
      return [];
    }
  }

  async getVariantAnalytics(): Promise<VariantAnalytics[]> {
    const returnData = await this.getReturnData();
    const variantMap = new Map<string, VariantAnalytics>();

    returnData.forEach((item) => {
      const key = `${item.sku}-${item.variant}`;

      if (!variantMap.has(key)) {
        variantMap.set(key, {
          sku: item.sku,
          title: item.title,
          variant: item.variant,
          returnCount: 0,
          reasons: {},
          mostCommonReason: "",
        });
      }

      const variant = variantMap.get(key)!;
      variant.returnCount++;
      variant.reasons[item.reason] = (variant.reasons[item.reason] || 0) + 1;
    });

    // Calculate most common reason for each variant
    variantMap.forEach((variant) => {
      let maxCount = 0;
      let mostCommon = "";
      Object.entries(variant.reasons).forEach(([reason, count]) => {
        if (count > maxCount) {
          maxCount = count;
          mostCommon = reason;
        }
      });
      variant.mostCommonReason = mostCommon;
    });

    return Array.from(variantMap.values()).sort(
      (a, b) => b.returnCount - a.returnCount
    );
  }

  async getDashboardData(): Promise<DashboardData> {
    const returnData = await this.getReturnData();

    const variantData = await this.getVariantAnalytics();

    const allReasons: { [key: string]: number } = {};
    returnData.forEach((variant) => {
      allReasons[variant.reason] = (allReasons[variant.reason] || 0) + 1;
    })
    const topReason = Object.entries(allReasons).sort(([, a], [, b]) => b - a)[0];


    const uniqueProducts = new Set(returnData.map((variant) => variant.title))

    const mostProblematic = variantData.reduce((max, variant) => 
      variant.returnCount > max.returnCount ? variant : max
    , variantData[0] || { title: 'N/A', returnCount: 0 });

    const criticalProducts = variantData.filter(variant => variant.returnCount > 30).length;

    const dashboardData: DashboardData = {
      totalReturns: returnData.length,
      affectedProducts: uniqueProducts.size,
      topReturnReason: topReason[0],
      topReturnReasonCount: topReason[1],
      mostProblematicProduct: mostProblematic.title,
      mostProblematicProductCount: mostProblematic.returnCount,
      criticalProducts: criticalProducts,
    };

    return dashboardData;
  }

  async getInsights(): Promise<Insight[]> {
    try {
      const data = await fs.readFile(this.insightsDataPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, return empty array
      return [];
    }
  }

  async saveInsight(
    insight: Omit<Insight, "id" | "createdAt">
  ): Promise<Insight> {
    const insights = await this.getInsights();
    const newInsight: Insight = {
      ...insight,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    insights.push(newInsight);
    await fs.writeFile(
      this.insightsDataPath,
      JSON.stringify(insights, null, 2)
    );
    return newInsight;
  }
}
