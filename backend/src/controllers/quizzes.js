import {
  addQuizzes,
  deleteQuizzes,
  getQuizById,
  getQuizzes,
} from '../services/quizzes.js';

export const getQuizzesController = async (req, res) => {
  const data = await getQuizzes();

  res.json({
    status: 200,
    message: 'Successfully get quizzes',
    data,
  });
};

export const getQuizController = async (req, res) => {
  const { quizId } = req.params;

  const data = await getQuizById(quizId);

  res.json({
    status: 200,
    message: 'Successfully get quiz',
    data,
  });
};

export const addQuizController = async (req, res) => {
  const quiz = await addQuizzes(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created quiz',
    data: quiz,
  });
};

export const deleteQuizController = async (req, res) => {
  const { quizId } = req.params;
  await deleteQuizzes(quizId);

  res.status(200).send({
    status: 200,
    message: 'Successfully deleted quiz',
    data: quizId,
  });
};
