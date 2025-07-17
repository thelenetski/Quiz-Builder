export type QuestionType = "boolean" | "input" | "checkbox";

export type QuestionForm = {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswers?: string[];
  correctAnswer?: string;
};

export type FormValues = {
  title: string;
  questions: QuestionForm[];
};

export type QuizList = {
  id: string;
  title: string;
  questionsCount: number;
};
