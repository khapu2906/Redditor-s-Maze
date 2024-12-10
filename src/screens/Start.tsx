import { Devvit, useState, useForm } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import { Level } from "../entities/enums/Level.js";
import { Service } from "../service.js";

const difficulties = [
  { string: "Easy", value: Level.EASY },
  { string: "Medium", value: Level.MEDIUM },
  { string: "Hard", value: Level.HARD },
];

export default function Start({
  context,
  transition,
  setMaze,
  service,
}: {
  context: any;
  transition: Function;
  setMaze: Function;
  service: Service;
}) {
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
          type: "string",
          name: "keyword",
          label: "Keywords(separated by a white space)",
        },
      ],
    },
    (values) => setKeyword(values.keyword),
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

  function onStart() {
    setMaze(service.startMaze(keyword, difficulty));
    transition();
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
