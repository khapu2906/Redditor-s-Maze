import { Devvit, useState, useInterval, useAsync, BaseContext } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import { Service } from "../service.js";
import { Level } from "../entities/enums/Level.js";
import {Screen} from "../entities/enums/Screen.js";

export default function Transition({
    context,
  setMaze,
  keyword,
  difficulty,
  setScreen,
    setStartAt
}: {
    context: BaseContext
    setMaze: Function;
    keyword: string;
    difficulty: Level;
    setScreen: Function;
}) {
    const { data: maze, loading, error } = useAsync(async () => await (new Service(context)).startMaze(keyword, difficulty));


    function start() {
        setMaze(maze);
        setScreen(Screen.QUIZ);
        setStartAt(Date.now());
   }
    if (loading) {
        return (
        <vstack gap="medium" alignment="center middle" height="100%">
            <text>Building Maze...</text>
        </vstack>);
    }

    if (error) {
        return (
        <vstack gap="medium" alignment="center middle" height="100%">
            <text>Error Getting Data!</text>
            <button appearance="primary" onPress={() => setScreen(Screen.START)}>
                Go Back
            </button>
        </vstack>);
    }

    return (
        <vstack gap="medium" alignment="center middle" height="100%">
            <text size="xxlarge">Ready?</text>
            <button appearance="primary" onPress={start}>
                Start
            </button>
        </vstack>
  );
}
