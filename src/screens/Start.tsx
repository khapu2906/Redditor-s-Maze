import {
  BaseContext,
  ContextAPIClients,
  Devvit,
  Dispatch,
  useAsync,
} from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Game } from "../main.js";
import { Service } from "../service.js";

export default function Start({
  context,
  game,
  setGame,
}: {
  context: ContextAPIClients & BaseContext;
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const {
    data: isMazeExist,
    loading,
    error,
  } = useAsync(async function () {
    const service = new Service(context);
    return await service.isMazeExist();
  });

  if (loading) {
    return (
      <vstack alignment="middle center" height="90%" width="100%">
        <text>Finding Maze...</text>
      </vstack>
    );
  }

  if (error) {
    return (
      <vstack gap="medium" alignment="middle center" height="100%" width="100%">
        <text>Error Finding Maze! Try Later</text>
      </vstack>
    );
  }

  if (!isMazeExist) {
    return (
      <vstack height="100%" width="100%" gap="medium" alignment="middle center">
        <button
          icon="edit-outline"
          appearance="primary"
          minWidth="200px"
          onPress={() => {
            game.screen = Screen.CREATE_MAZE;
            setGame(game);
          }}
        >
          Create Maze
        </button>
      </vstack>
    );
  }

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
