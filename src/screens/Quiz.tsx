import {
  Devvit,
  useState,
  BaseContext,
  ContextAPIClients,
} from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import { Maze, start as startMaze} from "../entities/Maze.js";
import { QuizType } from "../entities/enums/QuizType.js";
import NextNodes from "../components/NextNodes.js";
import { Quiz } from "../entities/Quiz.js";
import MultipleChoice from "../components/MultipleChoice.js";

export default function Quiz({
  context,
  maze,
  setScreen,
  setEndAt,
}: {
  context: ContextAPIClients;
  maze: Maze;
  setScreen: Function;
  setEndAt: Function;
}) {
  const [isDone, setIsDone] = useState(false);
  const [node, setNode] = useState(maze.nodes[0]);


    if (null == maze.startTime) {
        startMaze(maze);
    }

    startMaze(maze);

    startNode(node);

    function onAnswer() {
        endNode(node);

        // current node is final
        if (0 == node.nextNodes.length) {
            setEndAt(Date.now());
            setScreen(Screen.END);
        } else {
            setIsDone(true);
        }
    }

    let body;
    if (isDone) {
        body = (
            <NextNodes
                nodes={node.nextNodes}
                setIsDone={setIsDone}
                setNode={setNode}
            />
        );
    } else {
    const quiz = node.quizs[0];

    body = (
      <Question context={context} node={node} quiz={quiz} onAnswer={onAnswer} />
    );
  }

  return (
    <vstack gap="medium" alignment="center middle" padding="medium">
      {body}
    </vstack>
  );
}

function Question({
  node,
  quiz,
  onAnswer,
  context,
}: {
  context: ContextAPIClients;
  node: Node;
  quiz: Quiz;
  onAnswer: Function;
}) {
  let body;
  switch (quiz.type) {
    case QuizType.FILL_BLANK:
      body = <FillInTheBlank context={context} onAnswer={onAnswer} />;
      break;
    default:
      body = <MultipleChoice context={context} onAnswer={onAnswer} />;
  }
  return body;
}
