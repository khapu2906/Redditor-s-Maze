import { Devvit, useState, BaseContext } from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import { Maze } from "../entities/Maze.js";

export default function Quiz({
  context,
  maze,
  setScreen,
  setEndAt,
}: {
  context: BaseContext;
  maze: Maze;
  setScreen: Function;
  setEndAt: Function;
}) {
  const [isDone, setIsDone] = useState(false);
  const [node, setNode] = useState(maze.nodes[0]);


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
    const nextNodes = node.nextNodes().map((node : Node) => (
      <button
        onPress={() => {
          setIsDone(false);
          setNode(node);
        }}
      >
        Node {node.url}
      </button>
    ));
    body = (
      <vstack gap="medium">
        <text>Next Nodes</text>
        {nextNodes}
      </vstack>
    );
  } else {
    const quiz = node.quizs[0];
    body = (
      <vstack gap="medium">
        <text>Node: {node.url}</text>
        <text>Question: {quiz.id}</text>
        <text>Correct Answer: {quiz.correctAnswer}</text>
        <button onPress={onAnswer}>Answer</button>
      </vstack>
    );
  }

  return (
    <vstack gap="medium" alignment="center middle" padding="medium">
      {body}
    </vstack>
  );
}
