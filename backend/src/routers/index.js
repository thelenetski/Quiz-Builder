import { Router } from 'express';
import quizzesRouter from './quizzesRouter.js';

const router = Router();

router.use('/quizzes', quizzesRouter);

export default router;
