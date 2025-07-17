export function UpdateDataQuiz(val, index) {
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
}
