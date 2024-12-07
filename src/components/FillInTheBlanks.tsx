import { useState, Devvit, useForm } from "@devvit/public-api";

function FillInTheBlanks({ context, question, answer }) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    function checkAnswer(values) {
        setIsCorrect(
            values.answer.trim().toLowerCase() === answer.toLowerCase(),
        );
    }

    const form = useForm(
        {
            fields: [{ type: "string", name: "answer", label: "Answer" }],
        },
        checkAnswer,
    );

    function showForm() {
        context.ui.showForm(form);
    }

    return (
        <vstack height="100%" width="100%" gap="medium" alignment="center middle">
            <text size="large">Fill in the blank:</text>
            <text size="medium">{question}</text>

      <button appearance="primary" onPress={showForm}>
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

export default FillInTheBlanks;
