import {
  ContextAPIClients,
  Devvit,
  Dispatch,
  useAsync,
} from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Service } from "../service.js";
import { Game } from "../main.js";

export default function End({
  game,
  setGame,
  context,
}: {
  game: Game;
  setGame: Dispatch<Game>;
  context: ContextAPIClients;
}) {
  const { loading, error } = useAsync(async function () {
    const service = new Service(context);
    return await service.saveUser(game.maze);
  });

  if (loading) {
    return (
      <vstack alignment="middle center" gap="medium" height="100%" width="100%">
        <text>Saving Your Result...</text>
      </vstack>
    );
  }

  if (error) {
    <vstack alignment="middle center" gap="medium" height="100%" width="100%">
      <text>Error Upload Your Result! Try Later</text>
    </vstack>;
  }

  function resetGame() {
    setGame({
      screen: Screen.START,
      quizIndex: 0,
      nodeIndex: 0,
      maze: null,
    });
  }

  return (
    <vstack alignment="middle center" gap="medium" height="100%" width="100%">
      <text>Finish! You score {game.maze?.completedPoint}</text>
      <button icon="home-fill" appearance="primary" onPress={resetGame}>
        Home Screen
      </button>
    </vstack>
  );
}
