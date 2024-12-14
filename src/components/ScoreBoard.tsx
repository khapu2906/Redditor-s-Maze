import { Devvit, useAsync } from "@devvit/public-api";

export default function ScoreBoard({
  usernames,
  scores,
}: {
  usernames: string[];
  scores: number[];
}) {
  return (
    <hstack gap="medium" width="100%" alignment="middle center">
      <vstack height="100%" width="70%" alignment="center">
        {usernames.map((name) => (
          <text>{name}</text>
        ))}
      </vstack>

      <vstack height="100%" width="30%" alignment="center">
        {scores.map((score) => (
          <text>{score}</text>
        ))}
      </vstack>
    </hstack>
  );
}
