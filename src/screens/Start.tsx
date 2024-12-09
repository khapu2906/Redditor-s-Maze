import { Devvit, useState, useForm } from "@devvit/public-api";

const difficulties = ["Easy", "Medium", "Hard"];

export default function Start({ context, transition }) {
  const [keyword, setKeyword] = useState("");
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const difficultyForm = useForm(
    {
      fields: [
        {
          type: "select",
          name: "difficulty",
          label: "Difficulty",
          options: difficulties.map((value) => {
            return { label: value, value: value };
          }),
        },
      ],
    },
    (values) => setDifficulty(values.difficulty),
  );

  const keywordForm = useForm(
    {
      fields: [
        {
          type: "string",
          name: "keyword",
          label: "Keyword",
        },
      ],
    },
    (values) => setKeyword(values.keyword),
  );

  function showKeywordForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

  const text =
    "" == keyword ? (
      <text color="neutral-content-weak">Keyword</text>
    ) : (
      <text>{keyword}</text>
    );
  return (
    <vstack height="100%" width="100%" gap="medium" alignment="center middle">
      <hstack gap="medium" alignment="middle center">
        {text}
        <button icon="topic-programming" onPress={showKeywordForm}></button>
      </hstack>
      <hstack gap="medium" alignment="middle center">
        <text>Difficulty: {difficulty}</text>
        <button icon="caret-down" onPress={showDifficultyForm}></button>
      </hstack>
      <button appearance="primary" onPress={transition}>Start</button>
    </vstack>
  );
}
