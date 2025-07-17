"use client";

import { generateUUID } from "@/lib/uuid";
import { createQuiz } from "@/services/quizService";
import { QuestionForm, QuestionType } from "@/types/quiz";
import { SelectorOption } from "@/utils/SelectorOption";
import { FormSchema, quizSchema } from "@/validation/quizSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

export const dynamic = "force-dynamic";

export default function CreateForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      title: "",
      questions: [],
    },
    resolver: yupResolver(quizSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({
      id: generateUUID(),
      type: "input",
      text: "",
    });
  };

  const onSubmit = async (rawData: FormSchema) => {
    const data: FormSchema = {
      title: rawData.title,
      questions: rawData.questions.map((q) => {
        const base = {
          id: q.id,
          type: q.type,
          text: q.text,
        };

        if (q.type === "boolean" || q.type === "input") {
          return {
            ...base,
            correctAnswer: q.correctAnswer,
          };
        }

        if (q.type === "checkbox") {
          return {
            ...base,
            options: q.options?.filter((opt) => opt?.trim() !== "") || [],
            correctAnswers: q.correctAnswers || [],
          };
        }
        return base;
      }),
    };

    console.log("Final submission payload:", data);

    createQuiz(data);
  };

  const questions = watch("questions");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 text-center"
    >
      <h1 className="text-4xl">Create Quiz</h1>

      <input
        {...register("title", { required: "Quiz title is required" })}
        placeholder="Quiz title"
        className="w-70 border-1 border-gray-300 p-2 rounded-lg bg-white"
      />
      {errors.title && (
        <p className="text-red-600 -mt-2">{errors.title.message}</p>
      )}

      <button
        type="button"
        onClick={addQuestion}
        className="w-70 bg-emerald-600 text-white py-2 px-5 rounded-lg hover:cursor-pointer"
      >
        Add question
      </button>
      {errors.questions && (
        <p className="text-red-600 -mt-2">{errors.questions.message}</p>
      )}

      {fields.map((field, index) => {
        const questionType = questions?.[index]?.type;

        return (
          <div
            key={field.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
            className="w-70 flex flex-col gap-4 bg-white rounded-lg"
          >
            <input
              {...register(`questions.${index}.text` as const, {
                required: "Question text is required",
              })}
              placeholder={`Question ${index + 1}`}
              className="border-1 border-gray-300 p-2 rounded-lg bg-white"
            />

            <select
              {...register(`questions.${index}.type` as const)}
              onChange={(e) => {
                const val = e.target.value as QuestionType;
                const updated: QuestionForm = {
                  id: generateUUID(),
                  type: val,
                  text: getValues(`questions.${index}.text`) || "",
                };

                if (val === "checkbox") {
                  updated["options"] = [""];
                  updated["correctAnswers"] = [];
                } else if (val === "boolean") {
                  updated["correctAnswer"] = "";
                }

                update(index, updated);
              }}
              className="border-1 border-gray-300 p-2 rounded-lg bg-white"
            >
              <option value="boolean">True/False</option>
              <option value="input">Short answer</option>
              <option value="checkbox">Checkbox</option>
            </select>

            {questionType === "boolean" && (
              <select
                {...register(`questions.${index}.correctAnswer` as const)}
              >
                <option value="">Choose the correct answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}

            {questionType === "input" && (
              <input
                {...register(`questions.${index}.correctAnswer` as const)}
                placeholder="Correct answer"
                className="border-1 border-gray-300 p-2 rounded-lg bg-white"
              />
            )}

            {questionType === "checkbox" && (
              <SelectorOption
                control={control}
                questionIndex={index}
                {...{ register, setValue, getValues }}
              />
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              className="hover:underline hover:cursor-pointer"
            >
              Remove question
            </button>
          </div>
        );
      })}

      <button
        type="submit"
        className="w-70 bg-blue-500 text-white rounded-lg py-2 px-5 hover:cursor-pointer"
      >
        Create Quiz
      </button>
    </form>
  );
}
