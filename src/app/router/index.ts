import { Router } from 'express';
import { router as flatRouter } from './flat';

export const router: Router = Router({ mergeParams: true });

router.use('/flat', flatRouter);