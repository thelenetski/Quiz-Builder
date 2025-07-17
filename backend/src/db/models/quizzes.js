import { Schema, model } from 'mongoose';

const questionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ['boolean', 'input', 'checkbox'],
      required: true,
    },
    text: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String },
    correctAnswers: [{ type: String }],
  },
  { _id: false },
);

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    questions: {
      type: [questionSchema],
      validate: [(val) => val.length > 0],
    },
  },
  { timestamps: true, versionKey: false },
);

export const quizzesCollection = model('quizzes', quizSchema);
