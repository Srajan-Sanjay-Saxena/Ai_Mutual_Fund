import { Router, type IRouter } from 'express';
import * as controller from '../controller/mutualFund.controller.js';

const router: IRouter = Router();

router.post('/recommendations', controller.getRecommendations);
router.get('/analytics', controller.getAnalytics);
router.get('/filters', controller.getFilters);
router.get('/:id', controller.getFundDetails);

export default router;
