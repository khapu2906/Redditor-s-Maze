import { Devvit, useForm, useState } from "@devvit/public-api";
import { Level } from "../entities/enums/Level.js";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";

const difficulties = [
  { string: "Easy", value: Level.EASY },
  { string: "Medium", value: Level.MEDIUM },
  { string: "Hard", value: Level.HARD },
];

const keywords = [
  { string: "Home", value: "Home" },
  { string: "memes", value: "memes" },
  { string: "NoStupidQuestions", value: "NoStupidQuestions" },
  { string: "gaming", value: "gaming" },
];

export default function CreateMaze({ context, setScreen }) {
  const [keyword, setKeyword] = useState("");
  const [difficulty, setDifficulty] = useState(Level.EASY);

  const difficultyForm = useForm(
    {
      fields: [
        {
          type: "select",
          name: "difficulty",
          label: "Difficulty",
          options: difficulties.map((obj) => {
            return { label: obj.string, value: obj.value };
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
          type: "select",
          name: "keyword",
          label: "Keyword",
          options: keywords.map((obj) => {
            return { label: obj.string, value: obj.value };
          }),
        },
      ],
    },
    (values) => setKeyword(values.keyword[0]),
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

  function onStart() {
    console.debug("screens/Start.tsx keyword: " + keyword);
    setKeyword(keyword);
    setDifficulty(difficulty);
    setScreen(Screen.TRANSITION);
  }

  const text =
    keyword == "" ? (
      <text color="neutral-content-weak">Keyword</text>
    ) : (
      <text>{keyword}</text>
    );

  const button =
    keyword == "" ? (
      // disable button if no keywore entered
      <button appearance="secondary">Create</button>
    ) : (
      <button appearance="primary" onPress={onStart}>
        Create
      </button>
    );

  const difficultyText = difficulties.find(
    (obj) => obj.value == difficulty,
  ).string;

  return (
    <vstack height="100%" width="100%" alignment="center">
      <BackScreen screen={Screen.START} setScreen={setScreen} />

      <vstack height="100%" gap="medium" alignment="center">
        <hstack gap="medium" alignment="middle center">
          {text}
          <button icon="topic-programming" onPress={showKeywordsForm}></button>
        </hstack>
        <hstack gap="medium" alignment="middle center">
          <text>Difficulty: {difficultyText}</text>
          <button icon="caret-down" onPress={showDifficultyForm}></button>
        </hstack>
        {button}
      </vstack>
    </vstack>
  );
}
