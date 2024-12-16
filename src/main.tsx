// Learn more at developers.reddit.com/docs
import { Devvit, Dispatch, useState } from "@devvit/public-api";
import Start from "./screens/Start.js";
import Transition from "./screens/Transition.js";
import { Maze } from "./entities/Maze.js";
import Quiz from "./screens/Quiz.js";
import { Screen } from "./entities/enums/Screen.js";
import End from "./screens/End.js";
import CreateMaze from "./screens/CreateMaze.js";
import LeaderBoard from "./screens/LeaderBoard.js";
import CheckAnswer from "./screens/CheckAnswer.js";
import SelectNode from "./screens/SelectNode.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "Add my post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: "My devvit post",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: "Created post!" });
  },
});

export interface Game {
  maze: Maze | null;
  quizIndex: number;
  nodeIndex: number;
  screen: Screen;
}

Devvit.addCustomPostType({
  name: "Experience Post",
  height: "tall",
  render: (context) => {
    const [game, setGame]: [game: Game, setGame: Dispatch<Game>] = useState({
      screen: Screen.START,
      quizIndex: 0,
      maze: null,
      nodeIndex: 0,
    });

    console.debug("main.tsx maze", game.maze);
    let currentScreen;
    switch (game.screen) {
      case Screen.SELECT_NODE:
        currentScreen = <SelectNode game={game} setGame={setGame} />;
        break;
      case Screen.CHECK_ANSWER:
        currentScreen = <CheckAnswer game={game} setGame={setGame} />;
        break;
      case Screen.CREATE_MAZE:
        currentScreen = (
          <CreateMaze context={context} game={game} setGame={setGame} />
        );
        break;
      case Screen.LEADER_BOARD:
        currentScreen = <LeaderBoard context={context} game={ game } setGame={setGame} />;
        break;
      case Screen.TRANSITION:
        currentScreen = (
          <Transition context={context} game={game} setGame={setGame} />
        );
        break;
      case Screen.QUIZ:
        currentScreen = (
          <Quiz context={context} game={game} setGame={setGame} />
        );
        break;
      case Screen.END:
        currentScreen = <End context={context} game={game} setGame={setGame} />;
        break;
      default:
        currentScreen = <Start game={game} setGame={setGame} />;
    }

    return (
      <blocks height="tall">
        <zstack height="100%" width="100%">
          {currentScreen}
        </zstack>
      </blocks>
    );
  },
});

export default Devvit;
