import { Devvit, Dispatch } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Game } from "../main.js";
import { Node, start as startNode } from "../entities/Node.js";

export default function NextNodes({
  game,
  nodeIndices,
  setGame,
}: {
  game: Game;
  nodeIndices: number[];
  setGame: Dispatch<Game>;
}) {
  const nextNodes = nodeIndices.map((index) => {
    return (
      <button
        onPress={() => {
          const maze = game.maze;
          let node = maze.nodes[index];

          if (0 == node.endTime) {
            node = startNode(node);
          }

          const screen = 0 != node.endTime ? Screen.SELECT_NODE : Screen.QUIZ;

          game.screen = screen;
          game.nodeIndex = index;
          game.quizIndex = 0;
          setGame(game);
        }}
      >
        Node {index}
      </button>
    );
  });

  return (
    <vstack gap="medium">
      <text>Next Nodes</text>
      {nextNodes}
    </vstack>
  );
}
