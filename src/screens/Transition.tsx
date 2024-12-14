import { Devvit, useAsync, ContextAPIClients, Dispatch } from "@devvit/public-api";
import { Service } from "../service.js";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
import { Maze, start as startMaze} from "../entities/Maze.js";

export default function Transition({
  context,
  setMaze,
  setScreen,
}: {
  context: ContextAPIClients;
  setMaze: Dispatch<Maze>;
  setScreen: Dispatch<Screen>;
}) {
  const {
    data: maze,
    loading,
    error,
  } = useAsync(async function () {
    const service = new Service(context);
    return await service.loadMaze();
  });

    function onStart() {
        setMaze(startMaze(maze));
        setScreen(Screen.QUIZ);
    }

    let body = (
        <vstack height="100%" gap="medium" alignment="center">
            <text size="xxlarge">Ready?</text>
            <button appearance="primary" onPress={onStart}>
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
