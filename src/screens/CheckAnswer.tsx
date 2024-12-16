import { Devvit, Dispatch } from "@devvit/public-api";
import { getQuiz, startQuiz } from "../entities/Node.js";
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
  const node = maze.nodes.at(nodeIndex);

  if (node == undefined) {
    throw Error("nodeIndex out of range");
  }

  const quiz = getQuiz({ node, quizIndex });
  if (quiz == undefined) {
    throw Error("quizIndex out of range");
  }

  let action = (
    <button
      appearance="primary"
      onPress={() => {
        // update next quiz
        const newQuizIndex = quizIndex + 1;
        maze.nodes[nodeIndex] = startQuiz({ node, quizIndex: newQuizIndex });
        game.quizIndex = newQuizIndex;
        game.screen = Screen.QUIZ;
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
      alignment="middle center"
      width="100%"
      height="100%"
    >
      <Answer
        isCorrect={quiz.state == StateQuiz.SUCCESS}
        point={quiz.completedPoint}
      />
      {action}
    </vstack>
  );
}
