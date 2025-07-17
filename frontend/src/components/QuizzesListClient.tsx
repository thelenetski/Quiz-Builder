"use client";

import { useEffect, useState } from "react";
import { delQuiz, getQuizzes } from "@/services/quizService";
import { QuizList } from "@/types/quiz";
import Link from "next/link";
import { MdDeleteSweep } from "react-icons/md";

export default function QuizzesListClient() {
  const [quizzes, setQuizzes] = useState<QuizList[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await getQuizzes();
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    await delQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <>
      <div className="flex justify-between px-2 mb-4 text-xl">
        <p>Quiz name</p>
        <p>Count</p>
      </div>
      <div className="flex flex-col gap-2">
        {quizzes.map((item) => (
          <div
            key={item.id}
            className="flex justify-between p-2 rounded-lg bg-white"
          >
            <Link href={`/quizzes/${item.id}`} className="flex-1">
              <span>{item.title}</span>
            </Link>
            <div className="flex items-center">
              <span className="px-4 border-l border-gray-300">
                {item.questionsCount}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="hover:cursor-pointer"
              >
                <MdDeleteSweep size={20} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
