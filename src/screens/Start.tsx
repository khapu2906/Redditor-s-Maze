import { Devvit, useAsync } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import { Level } from "../entities/enums/Level.js";
import { Service } from "../service.js";
import { Screen } from "../entities/enums/Screen.js";

export default function Start({ context, setScreen, setMaze }) {
  const {
    data: maze,
    loading,
    error,
  } = useAsync(async function () {
    const service = new Service(context);
    return await service.startMaze("memes", Level.EASY);
  });

  if (loading) {
    return (
      <vstack height="100%" width="100%" alignment="middle center">
        <text>Building Maze...</text>
      </vstack>
    );
  }

  if (error) {
    return (
      <vstack height="100%" width="100%" alignment="middle center">
        <text>Error Getting Data! Try Later!</text>
      </vstack>
    );
  }

  setMaze(maze);

  return (
    <vstack height="100%" gap="medium" alignment="middle center">
      <button
        appearance="primary"
        minWidth="200px"
        onPress={() => setScreen(Screen.QUIZ)}
      >
        Start
      </button>
      <button minWidth="200px" onPress={() => setScreen(Screen.CREATE_MAZE)}>
        Create Maze
      </button>
      <button minWidth="200px" onPress={() => setScreen(Screen.LEADER_BOARD)}>
        Leader Board
      </button>
    </vstack>
  );
}
