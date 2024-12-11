import { Devvit, useState, useInterval } from "@devvit/public-api";
import Maze from "../entities/Maze.js";
import { Service } from "../service.js";
import { Level } from "../entities/enums/Level.js";

export default function Transition({
  setMaze,
  service,
  keyword,
  difficulty,
  startGame,
}: {
    setMaze: Function;
    service: Service;
    keyword: string;
    difficulty: Level;
    startGame: Function;
}) {
    const [maze, _setMaze]: [maze: Maze, _setMaze: Function] = useState(
        service.startMaze(keyword, difficulty),
    );

    function start() {
        setMaze(maze);
        // console.debug(maze);
        startGame();
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
