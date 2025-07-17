import * as yup from "yup";

const questionSchema = yup.object({
  id: yup.string().required(),
  type: yup
    .mixed<"boolean" | "input" | "checkbox">()
    .oneOf(["boolean", "input", "checkbox"])
    .required(),
  text: yup.string().required(),
  options: yup.array().of(yup.string()).optional(),
  correctAnswer: yup.string().optional(),
  correctAnswers: yup.array().of(yup.string()).optional(),
});

export const quizSchema = yup.object({
  title: yup.string().required(),
  questions: yup.array().of(questionSchema).min(1).required(),
});

export type FormSchema = yup.InferType<typeof quizSchema>;
