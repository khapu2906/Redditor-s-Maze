import {
  Devvit,
  useAsync,
  ContextAPIClients,
} from "@devvit/public-api";
import { Service } from "../service.js";
import { Level } from "../entities/enums/Level.js";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";

export default function Transition({
  context,
  setMaze,
  setScreen,
  setStartAt,
}: {
  context: ContextAPIClients;
  setMaze: Function;
  setScreen: Function;
  setStartAt: Function;
}) {
  const {
    data: maze,
    loading,
    error,
  } = useAsync(async () =>
    loadMaze({ context, keyword: "memes", difficulty: Level.MEDIUM }),
  );

  function start() {
    setMaze(maze);
    setScreen(Screen.QUIZ);
    setStartAt(Date.now());
  }

  let body = (
    <vstack height="100%" gap="medium" alignment="center">
      <text size="xxlarge">Ready?</text>
      <button appearance="primary" onPress={start}>
        Start
      </button>
    </vstack>
  );

  if (loading) {
    body = (
      <vstack alignment="center" height="100%">
        <text>Building Maze...</text>
      </vstack>
    );
  }

  if (error) {
    body = (
      <vstack gap="medium" alignment="center" height="100%">
        <text>Error Getting Data!</text>
        <button appearance="primary" onPress={() => setScreen(Screen.START)}>
          Go Back
        </button>
      </vstack>
    );
  }

  return (
    <vstack alignment="center" height="100%" width="100%">
      <BackScreen screen={Screen.START} setScreen={setScreen} />

      {body}
    </vstack>
  );
}

async function loadMaze({
  context,
  keyword,
  difficulty,
}: {
  context: ContextAPIClients;
  keyword: string;
  difficulty: Level;
}) {
  const service = new Service(context);
  return await service.startMaze(keyword, difficulty);
}
