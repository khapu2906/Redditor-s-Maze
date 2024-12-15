import { Devvit, Dispatch } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Game } from "../main.js";

export default function Start({
  game,
  setGame,
}: {
  game: Game;
  setGame: Dispatch<Game>;
}) {
  return (
    <vstack height="100%" width="100%" gap="medium" alignment="middle center">
      <button
        appearance="primary"
        minWidth="200px"
        onPress={() => {
          game.screen = Screen.TRANSITION;
          setGame(game);
        }}
      >
        Start
      </button>
      <button
        icon="edit-outline"
        minWidth="200px"
        onPress={() => {
          game.screen = Screen.CREATE_MAZE;
          setGame(game);
        }}
      >
        Create Maze
      </button>
      <button
        icon="world-outline"
        minWidth="200px"
        onPress={() => {
          game.screen = Screen.LEADER_BOARD;
          setGame(game);
        }}
      >
        Leader Board
      </button>
    </vstack>
  );
}
