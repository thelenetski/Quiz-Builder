import { useFieldArray } from "react-hook-form";

export function SelectorOption({
  control,
  questionIndex,
  register,
  setValue,
  getValues,
}: {
  control: any;
  questionIndex: number;
  register: any;
  setValue: any;
  getValues: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const correctAnswers: string[] =
    getValues(`questions.${questionIndex}.correctAnswers`) || [];

  const toggleCorrectAnswer = (optionValue: string, checked: boolean) => {
    let updated = [...correctAnswers];
    if (checked) {
      updated.push(optionValue);
    } else {
      updated = updated.filter((v) => v !== optionValue);
    }
    setValue(`questions.${questionIndex}.correctAnswers`, updated);
  };

  return (
    <div>
      <div>Answer options:</div>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <input
            {...register(`questions.${questionIndex}.options.${idx}` as const, {
              required: "Option is required",
            })}
            placeholder={`Option #${idx + 1}`}
          />
          <input
            type="checkbox"
            checked={correctAnswers.includes(
              getValues(`questions.${questionIndex}.options.${idx}`)
            )}
            onChange={(e) =>
              toggleCorrectAnswer(
                getValues(`questions.${questionIndex}.options.${idx}`),
                e.target.checked
              )
            }
          />
          Correct
          <button type="button" onClick={() => remove(idx)}>
            Remove option
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        Add option
      </button>
    </div>
  );
}
