import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService.js';

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

 getVariantAnalytics = async (req: Request, res: Response) => {
    try {
      const analytics = await this.analyticsService.getVariantAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch variant analytics' });
    }
  };
 
  getDashboardData = async (req: Request, res: Response) => {
    try {
      const dashboardData = await this.analyticsService.getDashboardData();
      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch variant analytics' });
    }
  };

  getInsights = async (req: Request, res: Response) => {
    try {
      const insights = await this.analyticsService.getInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch insights' });
    }
  };

  saveInsight = async (req: Request, res: Response) => {
    try {
      const { sku, title, variant, insight, note } = req.body;
      
      if (!sku || !title || !variant || !insight) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const savedInsight = await this.analyticsService.saveInsight({
        sku,
        title,
        variant,
        insight,
        note: note || ''
      });

      res.status(201).json(savedInsight);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save insight' });
    }
  };
}
