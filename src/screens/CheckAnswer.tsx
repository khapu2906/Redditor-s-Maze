import { Devvit, Dispatch } from "@devvit/public-api";
import { Node, getQuiz, start as startNode, startQuiz } from "../entities/Node.js";
import Answer from "../components/Answer.js";
import {
  bumpUp,
  getNodeIndices,
  end as endMaze,
  isLastNode,
} from "../entities/Maze.js";
import { Screen } from "../entities/enums/Screen.js";
import NextNodes from "../components/NextNodes.js";
import { StateQuiz } from "../entities/enums/State.js";
import { Game } from "../main.js";

export default function CheckAnswer({
  game,
  setGame,
}: {
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const nodeIndex = game.nodeIndex;
  const maze = game.maze;
  const quizIndex = game.quizIndex;
  const node: Node = maze.nodes.at(nodeIndex);
  const quiz = getQuiz({ node, quizIndex });
    let action = (
        <button
            appearance="primary"
            onPress={() => {
                // update next quiz
                const newQuizIndex = quizIndex + 1;
                maze.nodes[nodeIndex] = startQuiz({node, quizIndex: newQuizIndex});
                game.quizIndex = newQuizIndex;
                game.screen = Screen.QUIZ
                setGame(game);
            }}
        >
            Next Quiz
    </button>
  );

  // node is done
  if (0 != node.endTime) {
    const nextIndices = getNodeIndices({ maze, nodes: bumpUp(node, maze) });

    action = (
      <NextNodes game={game} nodeIndices={nextIndices} setGame={setGame} />
    );
  }

  // reach the final node of the maze
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
