import { Devvit, useState, ContextAPIClients } from "@devvit/public-api";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import { Maze, start as startMaze, bumpUp } from "../entities/Maze.js";
import { QuizType } from "../entities/enums/QuizType.js";
import NextNodes from "../components/NextNodes.js";
import {
  Quiz as QuizModel,
  checkAnswer,
  start as startQuiz,
} from "../entities/Quiz.js";
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
  const [node, setNode] = useState(maze.nodes[0]);
  const [quizIndex, setQuizIndex] = useState(0);

  if (0 == maze.startTime) {
    startMaze(maze);
  }

  startNode(node);

  let body;
  // player has answered all question
  if (quizIndex >= Object.values(node.quizs).length) {
    body = (
      <NextNodes
        nodes={bumpUp(node, maze)}
        setNode={setNode}
        setQuizIndex={setQuizIndex}
      />
    );
  } else {
    const quiz: QuizModel = Object.values(node.quizs)[quizIndex];

    if (0 == quiz.startTime) {
      startQuiz(quiz);
    }

    function onAnswer(answer: string) {
      checkAnswer(quiz, answer);

      endNode(node);

      console.debug("screens/Quiz.tsx next nodes", bumpUp(node, maze));
      // current node is final
      if (0 == bumpUp(node, maze).length) {
        setEndAt(Date.now());
        setScreen(Screen.END);
        return;
      }

      setQuizIndex(quizIndex + 1);
    }
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
  quiz,
  onAnswer,
  context,
}: {
  context: ContextAPIClients;
  node: Node;
  quiz: QuizModel;
  onAnswer: Function;
}) {
  let body;
  switch (quiz.type) {
    case QuizType.FILL_BLANK:
      body = (
        <FillInTheBlank
          question={quiz.questAgg.question.slice(0, 50)}
          context={context}
          onAnswer={onAnswer}
        />
      );
      break;
    default:
      body = (
        <MultipleChoice
          question={quiz.questAgg.question.slice(0, 50)}
          options={quiz.questAgg.options}
          context={context}
          onAnswer={onAnswer}
        />
      );
  }
  return body;
}
