import { Devvit, ContextAPIClients, Dispatch } from "@devvit/public-api";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, checkQuiz, start as startNode } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import { Maze } from "../entities/Maze.js";
import { QuizType } from "../entities/enums/QuizType.js";
import { Quiz as QuizModel, start as startQuiz } from "../entities/Quiz.js";
import MultipleChoice from "../components/MultipleChoice.js";

export default function Quiz({
  context,
  nodeIndex,
  quizIndex,
  setScreen,
  setMaze,
  maze,
}: {
  context: ContextAPIClients;
  nodeIndex: number;
  quizIndex: number;
  setScreen: Function;
  setMaze: Dispatch<Maze>;
  setNodeIndex: Dispatch<number>;
  maze: Maze;
}) {
  const node: Node = maze.nodes.at(nodeIndex);
  const quiz: QuizModel = Object.values(node.quizs).at(quizIndex);
  if (0 == quiz.startTime) {
    // assign new value to quiz
    node.quizs[quizIndex] = startQuiz(quiz);
    // update maze to node
    maze.nodes[nodeIndex] = node;
    setMaze(maze);
  }

  if (0 == node.startTime) {
    // find node and assign new value
    maze.nodes[nodeIndex] = startNode(node);
    setMaze(maze);
  }

  async function onAnswer(answer: string) {
    maze.nodes[nodeIndex] = checkQuiz({ node, quizIndex, answer });
      setMaze(maze);
      setScreen(Screen.CHECK_ANSWER);
  }

  return (
    <vstack
      gap="medium"
      alignment="middle center"
      padding="medium"
      width="100%"
      height="100%"
    >
      <Question context={context} quiz={quiz} onAnswer={onAnswer} />
    </vstack>
  );
}

function Question({
  quiz,
  onAnswer,
  context,
}: {
  context: ContextAPIClients;
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
