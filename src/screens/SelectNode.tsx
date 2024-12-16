import { Devvit, Dispatch } from "@devvit/public-api";
import {
  bumpUp,
  getNodeIndices,
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
  const node = maze.nodes.at(nodeIndex);
  const nextIndices = getNodeIndices({ maze, nodes: bumpUp(node, maze) });

  let action = (
    <NextNodes game={game} nodeIndices={nextIndices} setGame={setGame} />
  );

  if (isLastNode({ maze, node })) {
    action = (
      <button
        appearance="primary"
        onPress={async () => {
          game.maze = endMaze(maze);
          game.screen = Screen.END;
          setGame(game);
        }}
      >
        Finish!
      </button>
    );
  }

  let text =
    node?.quizs.length == 0 ? "Node has no quiz!" : "Node Already Completed";

  return (
    <vstack height="100%" width="100%" alignment="middle center" gap="medium">
      <text>{text}</text>
      {action}
    </vstack>
  );
}
