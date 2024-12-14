import { Devvit, Dispatch } from "@devvit/public-api";
import { Node, end as endNode } from "../entities/Node.js";
import Answer from "../components/Answer.js";
import { Maze, bumpUp, getNodeIndices, end as endMaze } from "../entities/Maze.js";
import { Screen } from "../entities/enums/Screen.js";
import NextNodes from "../components/NextNodes.js";
import { Quiz } from "../entities/Quiz.js";
import { StateQuiz } from "../entities/enums/State.js";

export default function CheckAnswer({
  quizIndex,
  setQuizIndex,
  setNodeIndex,
  nodeIndex,
  maze,
  setScreen,
  setMaze,
}: {
  quizIndex: number;
  setQuizIndex: Dispatch<number>;
  setNodeIndex: Dispatch<number>;
  nodeIndex: number;
  maze: Maze;
  setScreen: Dispatch<Screen>;
  setMaze: Dispatch<Maze>;
}) {
  const node: Node = maze.nodes.at(nodeIndex);
  let action;

  console.debug("screens/CheckAnswer maze 30", maze);
  if (
    Object.values(node.quizs).length == 1 ||
    Object.values(node.quizs).length - 1 == quizIndex
  ) {
    if (0 == node.endTime) {
      maze.nodes[nodeIndex] = endNode(node);
      setMaze(maze);
    }
    const nextIndices = getNodeIndices({ maze, nodes: bumpUp(node, maze) });

    action =
      node.url == maze.nodes.at(-1).url ? (
        // last node of maze
        <button appearance="primary" onPress={async () => {
            setMaze(endMaze(maze))
            setScreen(Screen.END)}}>
          Finish!
        </button>
      ) : (
        (action = (
          <NextNodes
              maze={maze}
            nodeIndices={nextIndices}
            setQuizIndex={setQuizIndex}
            setNodeIndex={setNodeIndex}
            setScreen={setScreen}
          />
        ))
      );
  } else {
    action = (
      <button appearance="primary" onPress={() => setQuizIndex(quizIndex + 1)}>
        Next Quiz
      </button>
    );
  }

  const quiz: Quiz = Object.values(node.quizs).at(quizIndex);

  return (
    <vstack
      padding="medium"
      gap="medium"
      alignment="center"
      width="100%"
      height="100%"
    >
      <vstack height="50%" alignment="middle center" gap="medium">
        <Answer
          isCorrect={quiz.state == StateQuiz.SUCCESS}
          point={quiz.completedPoint}
        />
      </vstack>
      {action}
    </vstack>
  );
}
