import { Devvit, useAsync } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
import ScoreBoard from "../components/ScoreBoard.js";
import { Service } from "../service.js";

export default function LeaderBoard({ game, setGame, context }) {
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

  return (
    <vstack height="100%" width="100%" alignment="center">
      <BackScreen screen={Screen.START} setGame={setGame} game={game} />

      <vstack height="100%" width="100%" gap="medium" alignment="center">
        <ScoreBoard usernames={["user"]} scores={[100]} />
        <spacer size="medium" />
        <text>You are the rank {data.rank} player</text>
      </vstack>
    </vstack>
  );
}
