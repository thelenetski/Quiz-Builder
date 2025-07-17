import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createQuizSchema } from '../validation/quizzes.js';
import {
  addQuizController,
  deleteQuizController,
  getQuizController,
  getQuizzesController,
} from '../controllers/quizzes.js';

const quizzesRouter = Router();

quizzesRouter.get('/', ctrlWrapper(getQuizzesController));
quizzesRouter.get('/:quizId', ctrlWrapper(getQuizController));
quizzesRouter.post(
  '/',
  validateBody(createQuizSchema),
  ctrlWrapper(addQuizController),
);
quizzesRouter.delete('/:quizId', ctrlWrapper(deleteQuizController));

export default quizzesRouter;
