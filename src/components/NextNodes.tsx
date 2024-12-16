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
  function onSelect(index: number) {
    const maze = game.maze;
    let node = maze.nodes[index];

    if (0 == node.startTime) {
      maze.nodes[index] = startNode(node);
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
    return <button onPress={() => onSelect(index)}>Node {index}</button>;
  });

  return (
    <vstack gap="medium">
      <text>Next Nodes</text>
      {nextNodes}
    </vstack>
  );
}
