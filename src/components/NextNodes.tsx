import { Devvit, Dispatch } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Game } from "../main.js";
import { start as startNode } from "../entities/Node.js";
import { bumpUp } from "../entities/Maze.js";

export default function NextNodes({
  game,
  setGame,
}: {
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const maze = game.maze;
  const currentNode = maze!.nodes.at(game.nodeIndex);

  if (undefined == currentNode) {
    throw Error("nodeIndex out of range");
  }

  const nodeIndices = currentNode.nextNodes;

  function onSelect(index: number) {
    const node = maze!.nodes[index];

    if (0 == node.startTime) {
      maze!.nodes[index] = startNode(node);
    }
    const screen =
      0 != node.endTime || 0 == node.quizs.length
        ? Screen.SELECT_NODE
        : Screen.QUIZ;

    game.screen = screen;
    game.nodeIndex = index;
    game.quizIndex = 0;
    setGame(game);
  }

  const nextNodes = nodeIndices.map((index) => {
    const node = maze.nodes.at(index);
    return <button onPress={() => onSelect(index)}>Node {node.name}</button>;
  });

  return (
    <vstack gap="medium">
      <text>Next Nodes</text>
      {nextNodes}
    </vstack>
  );
}
