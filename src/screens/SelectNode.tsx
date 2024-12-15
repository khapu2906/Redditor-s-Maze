import { Devvit, Dispatch } from "@devvit/public-api";
import { bumpUp, getNodeIndices } from "../entities/Maze.js";
import NextNodes from "../components/NextNodes.js";
import { Game } from "../main.js";

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

  return <NextNodes game={game} nodeIndices={nextIndices} setGame={setGame} />;
}
