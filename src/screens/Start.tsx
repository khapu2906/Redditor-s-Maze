import { Devvit } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";

export default function Start({ context, setScreen, setMaze }) {
  return (
    <vstack height="100%" width="100%" gap="medium" alignment="middle center">
      <button
        appearance="primary"
        minWidth="200px"
        onPress={() => setScreen(Screen.TRANSITION)}
      >
        Start
      </button>
      <button icon="edit-outline" minWidth="200px" onPress={() => setScreen(Screen.CREATE_MAZE)}>
        Create Maze
      </button>
      <button icon="world-outline" minWidth="200px" onPress={() => setScreen(Screen.LEADER_BOARD)}>
        Leader Board
      </button>
    </vstack>
  );
}
