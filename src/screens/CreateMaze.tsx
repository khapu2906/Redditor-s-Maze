import {
    BaseContext,
  ContextAPIClients,
  Devvit,
  Dispatch,
    IconName,
  useForm,
  useState,
} from "@devvit/public-api";
import { Level } from "../entities/enums/Level.js";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
import { Service } from "../service.js";
import { Game } from "../main.js";

const difficulties = [
  { string: "Easy", value: Level.EASY },
  { string: "Medium", value: Level.MEDIUM },
  { string: "Hard", value: Level.HARD },
];

export default function CreateMaze({
  context,
  game,
  setGame,
}: {
  context: ContextAPIClients & BaseContext;
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const [subreddit, setSubreddit] = useState("");
  const [difficulty, setDifficulty] = useState(Level.EASY);
  const service = new Service(context);

  const keywordForm = useForm(
    {
      fields: [
        {
          type: "string",
          name: "subreddit",
          label: "Subreddit",
        },
      ],
    },
    async function (values) {
      const name = values.subreddit?.replaceAll(" ", "") ?? "";

      if (undefined == name) {
        context.ui.showToast("Error getting name!");
      }
      if ("" == name) {
        context.ui.showToast("Subreddit not exist!");
      }
      if (await service.isSubredditExist(name)) {
        setSubreddit(name);
      } else {
        context.ui.showToast("Subreddit not exist!");
      }
    },
  );

  function showKeywordsForm() {
    context.ui.showForm(keywordForm);
  }

  async function onCreate() {
    context.ui.showToast({ text: "Creating Maze...", appearance: "neutral" });
    try {
      context.ui.navigateTo(
        await service.createMaze({ subreddit, level: difficulty }),
      );
    } catch (error) {
      context.ui.showToast({
        text: "Error Creating Maze! Try Later",
        appearance: "neutral",
      });
    }
  }

  const button =
    subreddit == "" ? (
      // disable button if no keywore entered
      <button icon="upload-fill" appearance="secondary">
        Create
      </button>
    ) : (
      <button icon="upload-fill" appearance="primary" onPress={onCreate}>
        Create
      </button>
    );

  return (
    <vstack height="100%" width="100%" alignment="center">
      <BackScreen screen={Screen.START} game={game} setGame={setGame} />

      <vstack height="70%" gap="large" alignment="middle center">
        <hstack alignment="middle" minWidth="200px">
          <text>Subreddit: {subreddit}</text>
          <spacer size="medium" grow />
          <button icon="topic-programming" onPress={showKeywordsForm}></button>
        </hstack>
        <hstack alignment="middle" minWidth="200px">
            <Options options={difficulties} difficulty={difficulty} setDifficulty={setDifficulty} />
        </hstack>

        {button}
      </vstack>
    </vstack>
  );
}

function Options({
    options,
    setDifficulty,
    difficulty,
}: {
    options: {string: string, value: Level}[];
    setDifficulty: Function;
    difficulty: Level;
}) {
    const buttons = options.map(function (option) {
        let icon : IconName = "radio-button-outline";
        let appearance: Devvit.Blocks.ButtonAppearance = "plain";

        if (difficulty == option.value) {
            icon = "radio-button-fill";
            appearance = "plain";
        }
        return (
            <button minWidth="50px" 
                icon={icon}
                appearance={appearance}
                onPress={() => setDifficulty(option.value)}
            >
                {option.string}
            </button>
    );
  });
  return (
    <vstack minWidth="50px" gap="medium" alignment="start">
      {buttons}
    </vstack>
  );
}
