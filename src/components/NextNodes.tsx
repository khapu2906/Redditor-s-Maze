import { Devvit, useState, BaseContext } from "@devvit/public-api";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";

export default function NextNodes({
  nodes,
  setNode,
  setQuizIndex,
}: {
  nodes: Node[];
  setNode: Function;
  setQuizIndex: Function;
}) {
  const nextNodes = nodes.map((node: Node) => (
    <button
      onPress={() => {
        setNode(node);
        setQuizIndex(0);
      }}
    >
      Node {node.url}
    </button>
  ));

  return (
    <vstack gap="medium">
      <text>Next Nodes</text>
      {nextNodes}
    </vstack>
  );
}
