import { Devvit, ContextAPIClients, Dispatch } from "@devvit/public-api";
import FillInTheBlank from "../components/FillInTheBlank.js";
import {
  Node,
  checkQuiz,
  start as startNode,
  end as endNode,
  getQuiz,
  isLastQuiz,
} from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import { QuizType } from "../entities/enums/QuizType.js";
import { Quiz as QuizModel, start as startQuiz } from "../entities/Quiz.js";
import MultipleChoice from "../components/MultipleChoice.js";
import { Game } from "../main.js";
import { isLastNode } from "../entities/Maze.js";

export default function Quiz({
  context,
  game,
  setGame,
}: {
  context: ContextAPIClients;
  game: Game;
  setGame: Dispatch<Game>;
}) {
  const nodeIndex = game.nodeIndex;
  const quizIndex = game.quizIndex;
  const maze = game.maze;

  const node: Node = game.maze.nodes.at(nodeIndex);
  const quiz = getQuiz({ node, quizIndex });

  function onAnswer(answer: string) {
    let newNode = checkQuiz({ node, quizIndex, answer });

    if (isLastQuiz({ node: newNode, quizIndex })) {
      newNode = endNode(newNode);
    }

    maze.nodes[nodeIndex] = newNode;
    game.maze = maze;
    game.screen = Screen.CHECK_ANSWER;
    setGame(game);
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
