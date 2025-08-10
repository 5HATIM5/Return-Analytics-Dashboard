import { Router } from 'express';
import { analyticsRouter } from './analytics';

export const router = Router();

// Mount route modules
router.use('/analytics', analyticsRouter);
