import { getQuiz } from "@/services/quizService";
import { QuestionForm } from "@/types/quiz";

interface Props {
  params: { id: string };
}

export default async function QuizPage({ params }: Props) {
  const id = params.id;
  const quiz = await getQuiz(id);

  return (
    <>
      <h1 className="text-2xl pb-2 mb-2 border-b-1 border-gray-300">
        Quiz Name:
      </h1>
      <p className="text-1xl uppercase">{quiz.data.title}</p>
      <h1 className="text-2xl pb-2 mb-2 mt-10 border-b-1 border-gray-300">
        Questions:
      </h1>
      <div className="flex flex-col gap-2 text-1xl">
        {quiz.data.questions.map((item: QuestionForm, index: number) => {
          return <p key={item.id}>{`${index + 1}) ${item.text}`}</p>;
        })}
      </div>
    </>
  );
}
