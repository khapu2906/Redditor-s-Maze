import { Devvit, useAsync } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import BackScreen from "../components/BackScreen.js";
import ScoreBoard from "../components/ScoreBoard.js";

export default function LeaderBoard({ setScreen }) {
  return (
    <vstack height="100%" alignment="center">
      <BackScreen screen={Screen.START} setScreen={setScreen} />
      <vstack height="100%" gap="medium" alignment="center">
        <ScoreBoard usernames={["user"]} scores={[100]} />
        <spacer size="medium" />
        <text>You are the top % of players</text>
      </vstack>
    </vstack>
  );
}
