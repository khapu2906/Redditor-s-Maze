import {
    BaseContext,
  ContextAPIClients,
  Devvit,
  Dispatch,
  useAsync,
} from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
import ScoreBoard from "../components/ScoreBoard.js";
import { Service } from "../service.js";
import { Game } from "../main.js";

export default function LeaderBoard({
  game,
  setGame,
  context,
}: {
  context: ContextAPIClients & BaseContext;
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const { data, loading, error } = useAsync(async () => {
    const service = new Service(context);
    return await service.getLeaderBoard();
  });

  if (loading) {
    return (
      <vstack height="100%" width="100%" alignment="middle center">
        <text>Loading...</text>
      </vstack>
    );
  }

  if (error) {
    return (
      <vstack height="100%" width="100%" alignment="middle center">
        <text>Error Loading Data! Try Later</text>
      </vstack>
    );
  }

  let text = `You haven't complete this maze`;
  if (data != null) {
    if (data.rank != null || data.userScore != 0) {
      text = `You rank #${data.rank} among ${data.numberOfFinishers} players`;
    }
  }
    context.userId
  return (
    <vstack height="100%" width="100%" alignment="center">
      <BackScreen screen={Screen.START} setGame={setGame} game={game} />

      <vstack height="70%" width="100%" gap="medium" alignment="middle center">
        <text size="xlarge">{text}</text>
      </vstack>
    </vstack>
  );
}
