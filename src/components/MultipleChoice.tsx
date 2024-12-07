import { Devvit, useState, useForm } from "@devvit/public-api";

function MultipleChoice({ context, question, options, answer }) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const form = useForm(
    {
      fields: [
        {
          type: "select",
          name: "answer",
          label: "Answer",
          options: options.map((value) => {
            return { label: value, value: value };
          }),
        },
      ],
    },
    checkAnswer,
  );

  function checkAnswer(values) {
    setIsCorrect(values.answer == answer);
  }

  function showForm() {
    context.ui.showForm(form);
  }

  return (
    <vstack height="100%" width="100%" gap="medium" alignment="center middle">
      <text size="large">{question}</text>
      <button
        appearance="primary"
        onPress={showForm}
      >
        Answer
      </button>
      {isCorrect !== null && (
        <text size="medium" color={isCorrect ? "green" : "red"}>
          {isCorrect ? "Correct!" : "Try again."}
        </text>
      )}
    </vstack>
  );
}

export default MultipleChoice;
