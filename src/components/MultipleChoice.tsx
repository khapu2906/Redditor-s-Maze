import { Devvit, useState, IconName, ContextAPIClients } from "@devvit/public-api";

export default function MultipleChoice({
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
      <button appearance="primary" onPress={() => onAnswer(answer)}>
        Answer
      </button>
    );

  return (
    <vstack alignment="middle center" gap="medium" width="100%" grow>
      <text>Multiple choice</text>

      <text width="70%" wrap={true}>{question}</text>

      <hstack width="100%" alignment="center">
          <Options options={options} answer={answer} setAnswer={setAnswer} />
      </hstack>

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
            appearance = "plain";
        }
        return (
            <button minWidth="50px" 
                icon={icon}
                appearance={appearance}
                onPress={() => setAnswer(string)}
            >
                {string}
            </button>
    );
  });
  return (
    <vstack minWidth="50px" gap="medium" alignment="start">
      {buttons}
    </vstack>
  );
}
