import { Devvit, useState, BaseContext } from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";
import { Screen } from "../entities/enums/Screen.js";
import Maze from "../entities/Maze.js";

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
  const [nodeIndex, setNodeIndex] = useState(0);

  const node = maze.nodes[nodeIndex];

  startNode(node);

  function onAnswer() {
    endNode(node);

    // current node is final
    if (nodeIndex >= maze.nodes.length - 1) {
      setEndAt(Date.now());
      setScreen(Screen.END);
    } else {
      setIsDone(true);
    }
  }

  function getNextIndices(from: number, count: number) {
    const temp = [];

    for (let i = from; i < maze.nodes.length && count > 0; i++) {
      temp.push(i);
      count--;
    }

    return temp;
  }
  let body;
  if (isDone) {
    const nextNodes = getNextIndices(nodeIndex + 1, 3).map((index) => (
      <button
        onPress={() => {
          setIsDone(false);
          setNodeIndex(index);
        }}
      >
        Node {index}
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
        <text>Node: {nodeIndex}</text>
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
