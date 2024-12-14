import { Devvit, Dispatch } from "@devvit/public-api";
import { Node } from "../entities/Node.js";
import { Maze, bumpUp, getNodeIndices } from "../entities/Maze.js";
import NextNodes from "../components/NextNodes.js";
import { Screen } from "../entities/enums/Screen.js";

export default function SelectNode({
  nodeIndex,
  maze,
  setScreen,
  setNodeIndex,
  setQuizIndex,
}: {
  nodeIndex: number;
  maze: Maze;
  setNodeIndex: Dispatch<number>;
  setQuizIndex: Dispatch<number>;
  setScreen: Dispatch<Screen>;
}) {
    const node = maze.nodes.at(nodeIndex)
  const nextIndices = getNodeIndices({maze, nodes: bumpUp(node, maze)})

  return (
    <NextNodes
        maze={maze}
      nodeIndices={nextIndices}
      setQuizIndex={setQuizIndex}
      setNodeIndex={setNodeIndex}
      setScreen={setScreen}
    />
  );
}
