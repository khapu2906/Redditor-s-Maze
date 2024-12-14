import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule";

import { State } from "./enums/State";

import { Node, start as startNode } from "./Node";
import { RuleMaze, calculatePointWithTime } from "./Rules";
import { User } from "./User";
export class Maze {
  public rule: IRule;
  public completedPoint: number = 0;
  public state: State = State.NOT_YET;
  public startTime: number = 0;
  public endTime: number = 0;
  public nodes: Array<Node> = [];

  constructor(
    public id: string,
    public keywords: string,
    public level: Level,
    public user: User,
  ) {
    this.rule = new RuleMaze(this.level);
  }

  createNode(url: string): Node {
    if (this.nodes.length + 1 > LevelMaxNode[this.level]) {
      throw new Error("Amount of Node invalid");
    }
    const node = new Node(this.level, url);
    this.nodes.push(node);

    return node;
  }
}

export function start(maze: Maze) {
  maze.startTime = new Date().getTime();
  // maze.nodes[0] = startNode(maze.nodes[0]);
  maze.state = State.WORKING;

  return maze;
}

export function bumpUp(currentNode: Node, maze: Maze): Node[] {
  if (currentNode.url == maze.nodes[maze.nodes.length - 1].url) {
    currentNode.isFinal = true;

    return [];
  } else {
    const others = maze.nodes.filter((item) => currentNode !== item);
    const shuffled = others.sort(() => 0.5 - Math.random());
    const randomCount = Math.max(2, Math.floor(Math.random() * others.length));
    const next = shuffled.slice(0, randomCount);

    return next;
  }
}

export function end(maze: Maze) {
  if (!maze.startTime) {
    throw new Error(
      "Maze has not been started yet. Call start() before stateDone().",
    );
  }
  if (maze.endTime) {
    throw new Error("Maze end");
  }
  maze.state = State.DONE;
  maze.endTime = new Date().getTime();
  const completedTime = maze.endTime - maze.startTime / (60 * 1000);
  for (const node of maze.nodes) {
    maze.completedPoint += node.completedPoint;
  }
  calculatePointWithTime(maze.rule, completedTime);
  maze.completedPoint += maze.rule.maxCompletedPoint ?? 0;
}

export function getNodeIndices({
  maze,
  nodes,
}: {
  maze: Maze;
  nodes: Node[];
}): number[] {
  const urls = maze.nodes.map((node) => node.url);
    console.debug(urls)
  return nodes.map((node) => urls.findIndex((url) => url == node.url));
}
