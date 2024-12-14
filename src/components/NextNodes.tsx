import { Devvit, Dispatch } from "@devvit/public-api";
import { Screen } from "../entities/enums/Screen.js";
import { Maze } from "../entities/Maze.js";

export default function NextNodes({
  maze,
  nodeIndices,
  setNodeIndex,
  setQuizIndex,
  setScreen,
}: {
  maze: Maze;
  nodeIndices: number[];
  setNodeIndex: Function;
  setQuizIndex: Function;
  setScreen: Dispatch<Screen>;
}) {
  const nextNodes = nodeIndices.map((index) => {
    return (
      <button
        onPress={() => {
          const screen =
            0 != maze.nodes[index].endTime ? Screen.SELECT_NODE : Screen.QUIZ;

          setScreen(screen);
          setNodeIndex(index);
          setQuizIndex(0);
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
