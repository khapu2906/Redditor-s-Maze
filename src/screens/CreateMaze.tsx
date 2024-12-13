import { Devvit, useForm, useState } from "@devvit/public-api";
import { Level } from "../entities/enums/Level.js";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
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

export default function CreateMaze({ context, setScreen }) {
  const [subreddit, setSubreddit] = useState("");
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
    (values) => setSubreddit(values.keyword[0]),
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

  async function onCreate() {
      context.ui.showToast({text: "Creating Maze...", appearance: "neutral"});
      console.debug("screens/Start.tsx keyword: " + subreddit);
      const service = new Service(context);
      await service.configMaze(subreddit, difficulty);
      context.ui.showToast({text: "Maze Created!", appearance: "success"});
  }

  const text =
    subreddit == "" ? (
      <text color="neutral-content-weak">Subreddit</text>
    ) : (
      <text>{subreddit}</text>
    );

  const button =
    subreddit == "" ? (
      // disable button if no keywore entered
        <button icon="upload-fill" appearance="secondary">Create</button>
    ) : (
      <button icon="upload-fill" appearance="primary" onPress={onCreate}>
        Create
      </button>
    );

  const difficultyText = difficulties.find(
    (obj) => obj.value == difficulty,
  ).string;

  return (
    <vstack height="100%" width="100%" alignment="center" gap="medium">
      <BackScreen screen={Screen.START} setScreen={setScreen} />

      <vstack gap="medium" alignment="center">
        <hstack alignment="middle" minWidth="200px">
          {text}
          <spacer size="medium" grow />
          <button icon="topic-programming" onPress={showKeywordsForm}></button>
        </hstack>
        <hstack alignment="middle" minWidth="200px">
          <text>Difficulty: {difficultyText}</text>
          <spacer size="medium" grow />
          <button icon="caret-down" onPress={showDifficultyForm}></button>
        </hstack>
      </vstack>

      {button}
    </vstack>
  );
}
