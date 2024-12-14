import { Devvit, useAsync } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Service } from "../service.js";

export default function End({ setScreen, maze, context }) {
  const { loading, error } = useAsync(async function () {
    const service = new Service(context);
    return await service.saveUser(maze);
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

  return (
    <vstack alignment="middle center" gap="medium" height="100%" width="100%">
      <text>Finish! Nice job</text>
      <button
        icon="home-fill"
        appearance="primary"
        onPress={() => setScreen(Screen.START)}
      >
        Home Screen
      </button>
    </vstack>
  );
}
