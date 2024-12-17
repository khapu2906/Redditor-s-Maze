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

    let userRecord = `You haven't complete this maze`;
    let topPlayer = "No one has finished this Maze"
    if (data != null) {
        if (data.topPlayer != null)  {
            topPlayer = `The rank #1 player has ${data.topPlayer.score} score`;
        }

        if (data.rank != null || data.userScore != 0) {
            userRecord = `You rank #${data.rank} with ${data.userScore} score among ${data.numberOfFinishers} players`;
            topPlayer = `The rank #1 player has ${data.topPlayer.score - data.userScore} score more`;
        }

    }

    return (
        <vstack height="100%" width="100%" alignment="center">
            <BackScreen screen={Screen.START} setGame={setGame} game={game} />

            <vstack height="70%" width="100%" gap="medium" alignment="middle center">
                <text size="xxlarge">{userRecord}</text>
                <text size="large">{topPlayer}</text>
      </vstack>
    </vstack>
  );
}
