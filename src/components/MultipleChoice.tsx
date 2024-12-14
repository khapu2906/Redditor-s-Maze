import { Devvit, useState, useForm } from "@devvit/public-api";

export default function MultipleChoice({ context, onAnswer }) {
  const [answer, setAnswer] = useState("");

  return (
    <vstack alignment="center" gap="medium">
      <text>Multiple choice</text>
      <button appearance="primary" disabled={"" == answer } onPress={onAnswer}>
        Answer
      </button>
    </vstack>
  );
}
