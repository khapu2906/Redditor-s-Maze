import { Devvit, Dispatch } from "@devvit/public-api";
import {
  end as endMaze,
  isLastNode,
} from "../entities/Maze.js";
import NextNodes from "../components/NextNodes.js";
import { Game } from "../main.js";
import { Screen } from "../entities/enums/Screen.js";

export default function SelectNode({
  game,
  setGame,
}: {
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const maze = game.maze;
  const nodeIndex = game.nodeIndex;
  const node = maze!.nodes.at(nodeIndex);

  if (node == undefined) {
    throw Error("nodeIndex out of range");
  }

  let action = <NextNodes game={game} setGame={setGame} />;

  if (isLastNode({ maze: maze!, node})) {
    action = (
      <button
        appearance="primary"
        onPress={async () => {
          game.maze = endMaze(maze!);
          game.screen = Screen.END;
          setGame(game);
        }}
      >
        Finish!
      </button>
    );
  }

  let text =
    node.quizs.length == 0 ? "Node has no quiz!" : "Node Already Completed";

  return (
    <vstack height="100%" width="100%" alignment="middle center" gap="medium">
      <text>{text}</text>
      {action}
    </vstack>
  );
}
