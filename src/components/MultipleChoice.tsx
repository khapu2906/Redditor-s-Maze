import { Devvit, useState, useForm, IconName, ContextAPIClients } from "@devvit/public-api";

export default function MultipleChoice({
  context,
  onAnswer,
  question,
  options,
}:{
context: ContextAPIClients,
    onAnswer: Function,
    question: string,
    options: string[]
}) {
  const [answer, setAnswer] = useState("");

  const button =
    "" == answer ? (
      <button appearance="primary" disabled>
        Answer
      </button>
    ) : (
      <button appearance="primary" onPress={onAnswer}>
        Answer
      </button>
    );

  return (
    <vstack alignment="middle center" gap="medium" width="100%">
      <text>Multiple choice</text>
      <text width="70%" wrap={true}>Question: {question}</text>
      <Options options={options} answer={answer} setAnswer={setAnswer} />

      {button}
    </vstack>
  );
}

function Options({
  options,
  setAnswer,
  answer,
}: {
  options: string[];
  setAnswer: Function;
  answer: string;
}) {
  const buttons = options.map(function (string) {
    let icon: IconName = "radio-button-outline";
    let appearance: Devvit.Blocks.ButtonAppearance = "plain";

    if (answer == string) {
      icon = "radio-button-fill";
      appearance = "secondary";
    }
    return (
      <button
        icon={icon}
        appearance={appearance}
        onPress={() => setAnswer(string)}
      >
        {string}
      </button>
    );
  });
  return (
    <vstack minWidth="300px" gap="medium">
      {buttons}
    </vstack>
  );
}
