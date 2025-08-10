import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController.js';

export const analyticsRouter = Router();
const analyticsController = new AnalyticsController();

analyticsRouter.get('/variants', analyticsController.getVariantAnalytics);

analyticsRouter.get('/dashboard', analyticsController.getDashboardData);

analyticsRouter.get('/insights', analyticsController.getInsights);
analyticsRouter.post('/insights', analyticsController.saveInsight);
