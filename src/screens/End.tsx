import { Devvit } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";

export default function End({ startAt, endAt, setScreen }) {
  return (
    <vstack alignment="middle center" gap="medium" height="100%" width="100%">
      <text>Finish! Nice job</text>
      <text>{(endAt - startAt) / (1000 * 60)} mins</text>
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
