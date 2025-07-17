import createHttpError from 'http-errors';
import { quizzesCollection } from '../db/models/quizzes.js';
import mongoose from 'mongoose';

export const getQuizzes = async () => {
  const quizzes = await quizzesCollection
    .find({}, { id: 1, title: 1, questions: 1 })
    .lean();

  const data = quizzes.map((quiz) => ({
    id: quiz._id,
    title: quiz.title,
    questionsCount: quiz.questions ? quiz.questions.length : 0,
  }));

  return data;
};

export const getQuizById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid quiz ID');
  }

  const quiz = await quizzesCollection.findById(id).lean();

  if (!quiz) {
    throw new Error('Quiz not found');
  }

  return quiz;
};

export const addQuizzes = (payload) => {
  return quizzesCollection.create(payload);
};

export const deleteQuizzes = async (payload) => {
  const quiz = await quizzesCollection.findOneAndDelete({
    _id: payload,
  });

  if (!quiz) throw createHttpError(404, 'Quiz not found');
};
