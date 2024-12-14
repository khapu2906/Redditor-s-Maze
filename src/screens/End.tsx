import { Devvit } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";

export default function End({ setScreen }) {
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
