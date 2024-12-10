import { Devvit, useState, useForm } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import { Level } from "../entities/enums/Level.js";
import { Service } from "../service.js";

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

export default function Start({
  context,
  setScreen,
  setKeyword,
  setDifficulty,
}) {
  const [keyword, _setKeyword] = useState("");
  const [difficulty, _setDifficulty] = useState(Level.EASY);

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
    (values) => _setDifficulty(values.difficulty),
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
    (values) => _setKeyword(values.keyword[0]),
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

  function onStart() {
    setKeyword(keyword);
    setDifficulty(difficulty);
    setScreen();
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
      <button appearance="secondary">Start</button>
    ) : (
      <button appearance="primary" onPress={onStart}>
        Start
      </button>
    );

  const difficultyText = difficulties.find(
    (obj) => obj.value == difficulty,
  ).string;

  return (
    <vstack height="100%" width="100%" gap="medium" alignment="center middle">
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
  );
}
