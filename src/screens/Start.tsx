import { Devvit, useState, useForm } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import {Level} from "../entities/enums/Level.js"

const difficulties = [{ string: "Easy", value: Level.EASY }, { string: "Medium", value: Level.MEDIUM },{  string: "Hard", value: Level.HARD }];

export default function Start({ context, transition, setMaze }) {
  const [keywords, setKeywords] = useState([]);
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
          name: "keywords",
          label: "Keywords(separated by a white space)",
        },
      ],
    },
    (values) => setKeywords(values.keywords?.split(/\s+/)),
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  function showDifficultyForm() {
    context.ui.showForm(difficultyForm);
  }

    function onStart() {
        const maze = new Maze(keywords, difficulty);
        setMaze(maze);
        transition();
    }

  const text =
    keywords.length == 0 ? (
      <text color="neutral-content-weak">Keyword</text>
    ) : (
      <text>{keywords}</text>
    );

    const button = keywords.length == 0 ? (
        // disable button if no keywore entered
        <button appearance="secondary">Start</button>
    ) : (
        <button appearance="primary" onPress={onStart}>Start</button>
    );

    const difficultyText = difficulties.find((obj) => obj.value == difficulty).string;
            
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
            {
                button
            }
    </vstack>
  );
}
