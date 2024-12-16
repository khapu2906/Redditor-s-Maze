import {
  useState,
  Devvit,
  useForm,
  ContextAPIClients,
} from "@devvit/public-api";

export default function FillInTheBlank({
  context,
  question,
  onAnswer,
}: {
  context: ContextAPIClients;
  question: string;
  onAnswer: Function;
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

  const form = useForm(
    {
      fields: [
        {
          type: "string",
          name: "keyword",
          label: "Keyword",
        },
      ],
    },
    (values) => setAnswer(values.keyword?.replaceAll(" ", "")),
  );

  return (
    <vstack alignment="middle center" gap="medium" width="100%" grow>
      <text>Fill In The Blank</text>

      <text width="70%" wrap={true}>{question}</text>

      <hstack minWidth="200px" alignment="middle">
        <text>Keyword: {answer}</text>

        <spacer grow />

        <button
          icon="topic-programming-outline"
          onPress={() => context.ui.showForm(form)}
        />
      </hstack>

      {button}
    </vstack>
  );
}
