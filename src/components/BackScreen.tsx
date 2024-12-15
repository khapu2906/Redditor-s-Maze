import { Devvit, Dispatch } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Game } from "../main.js";

export default function BackScreen({
  screen,
  game,
  setGame,
}: {
  screen: Screen;
  setGame: Dispatch<Game>;
  game: Game;
}) {
  return (
    <hstack width="100%" alignment="start top" padding="medium">
      <button
        icon="back-fill"
        appearance="plain"
        onPress={() => {
          game.screen = screen;
          setGame(game);
        }}
      />
    </hstack>
  );
}
