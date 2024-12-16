import { IExtendInfo } from "./interfaces/IQuiz";
import { QuizType } from "./enums/QuizType.js";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule";
import { RuleNode, calculatePointWithTime } from "./Rules";

import { State } from "./enums/State";

import { Quiz, start as _startQuiz } from "./Quiz.js";
import { checkAnswer } from "./Quiz.js";

export class Node {
  public completedPoint: number = 0;

  public rule: IRule;
  public state: State = State.NOT_YET;
  public startTime: number = 0;
  public endTime: number = 0;
  public quizs: Quiz[] = [];

  constructor(
    public level: Level,
    public url: string,
  ) {
    this.rule = new RuleNode(this.level);
  }

  createQuiz(info: IExtendInfo, type: QuizType = QuizType.FILL_BLANK): Quiz {
    const quiz = new Quiz(this.level, info, type);
    this.quizs.push(quiz);
    return quiz;
  }
}

export function start(node: Node) {
  node.startTime = new Date().getTime();
  const firstQuiz = getQuiz({ node, quizIndex: 0 });
  // post can have 0 comment hence no quiz
  if (undefined == firstQuiz) {
    node = end(node);
  } else {
    node.quizs[0] = _startQuiz(firstQuiz);
    node.state = State.WORKING;
  }
  return node;
}

export function end(node: Node) {
  if (!node.startTime) {
    throw new Error(
      "Node has not been started yet. Call start() before stateDone().",
    );
  }
  if (node.endTime) {
    throw new Error("Node end");
  }
  node.state = State.DONE;
  node.endTime = new Date().getTime();
  const completedTime = node.endTime - node.startTime / (60 * 1000);
  for (const quiz of node.quizs) {
    node.completedPoint += quiz.completedPoint;
  }
  calculatePointWithTime(node.rule, completedTime);
  node.completedPoint += node.rule.maxCompletedPoint ?? 0;

  return node;
}

export function checkQuiz({
  node,
  quizIndex,
  answer,
}: {
  node: Node;
  quizIndex: number;
  answer: string;
}) {
  // get quiz value
  const quiz = getQuiz({ node, quizIndex });
  if (undefined == quiz) {
    throw Error("quizIndex out of range");
  }
  // update quiz value
  const { quiz: newQuiz } = checkAnswer(quiz, answer);

  node.quizs[quizIndex] = newQuiz;

  return node;
}

export function getQuiz({
  node,
  quizIndex,
}: {
  node: Node;
  quizIndex: number;
}) {
  return node.quizs.at(quizIndex);
}

export function isLastQuiz({
  node,
  quizIndex,
}: {
  node: Node;
  quizIndex: number;
}) {
  return node.quizs.length - 1 <= quizIndex;
}

export function startQuiz({
  node,
  quizIndex,
}: {
  node: Node;
  quizIndex: number;
}) {
  const quiz = getQuiz({ node, quizIndex });
  if (quiz == undefined) throw Error("quizIndex out of range ");
  node.quizs[quizIndex] = _startQuiz(quiz);

  return node;
}
