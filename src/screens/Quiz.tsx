import { Devvit, useState, useInterval, BaseContext } from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, start, end } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";

export default function Quiz({
  context,
  duration,
  node,
    setScreen,
    setEndAt,
}: {
  context: BaseContext;
  duration: number;
  node: Node;
}) {
  const [isDone, setIsDone] = useState(false);
  console.debug(node);

  function answerHandler() {
      setEndAt(Date.now())
      setScreen(Screen.END);
      setIsDone(true);
  }

    let body;
    if (isDone) {
        // test getting reference to firstNode
        const urls = node.nextNodes.map((node: Node) => (
            <button>{node.url}</button>
        ));
        body = (
      <vstack gap="medium">
        <text>Next Nodes</text>
        {urls}
      </vstack>
    );
  } else {
    const quiz = node.quizs[0];
    body = (
      <vstack gap="medium">
        <text>Node: {node.id}</text>
        <text>Question: {quiz.id}</text>
        <text>Correct Answer: {quiz.correctAnswer}</text>
      </vstack>
    );
  }

  return isDone ? (
    <vstack gap="medium" alignment="center middle" padding="medium">
      {body}
    </vstack>
  ) : (
    <vstack gap="medium" alignment="center middle" padding="medium">
      {body}
      <button onPress={answerHandler}>Answer</button>
    </vstack>
  );
}
