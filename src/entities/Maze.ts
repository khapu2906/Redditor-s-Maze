import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule";

import { State } from "./enums/State";

import { Node, start as startNode } from "./Node.js";
import { RuleMaze, calculatePointWithTime } from "./Rules";
import { User } from "./User";
export class Maze {
  public rule: IRule;
  public completedPoint: number = 0;
  public state: State = State.NOT_YET;
  public startTime: number = 0;
  public endTime: number = 0;
  public nodes: Array<Node> = [];
  public user: User | null;

  constructor(
    public id: string,
    public keywords: string,
    public level: Level,
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
  maze.nodes[0] = startNode(maze.nodes[0]);
  maze.state = State.WORKING;

  return maze;
}

export function bumpUp(currentNode: Node, maze: Maze): number[] {
  if (currentNode.url == maze.nodes.at(-1).url) {
    return [];
  } else {
    const others = maze.nodes.filter((item) => currentNode.url != item.url);
    const shuffled = others.sort(() => 0.5 - Math.random());
      const urls = maze.nodes.map((node) => node.url);
      const indices = shuffled
          .map((node) => node.url)
          .map((url) => urls.findIndex((item) => url == item)) 
    const randomCount = Math.max(2, Math.floor(Math.random() * indices.length));
    return indices.slice(0, randomCount);
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

  return maze;
}

export function isLastNode({ maze, node }: { maze: Maze; node: Node }) {
  return node.url == maze.nodes.at(-1).url;
}
