import { Devvit, useState, BaseContext } from "@devvit/public-api";
import { Node, start as startNode, end as endNode } from "../entities/Node.js";

export default function NextNodes({
  nodes,
  setIsDone,
  setNode,
}: {
  nodes: Node[];
  setIsDone: Function;
  setNode: Function;
}) {
  const nextNodes = nodes.map((node: Node) => (
    <button
      onPress={() => {
        setIsDone(false);
        setNode(node);
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
