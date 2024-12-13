// Learn more at developers.reddit.com/docs
import { Devvit, useAsync, useState } from "@devvit/public-api";
import Start from "./screens/Start.js";
import Transition from "./screens/Transition.js";
import { Maze } from "./entities/Maze.js";
import { Service } from "./service.js";
import Timer from "./components/Timer.js";
import Quiz from "./screens/Quiz.js";
import { Level } from "./entities/enums/Level.js";
import { Node } from "./entities/Node.js";
import { Screen } from "./entities/enums/Screen.js";
import End from "./screens/End.js";
import CreateMaze from "./screens/CreateMaze.js";
import LeaderBoard from "./screens/LeaderBoard.js";

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

Devvit.addCustomPostType({
  name: "Experience Post",
  height: "regular",
  render: (context) => {
    const [screen, setScreen] = useState(Screen.START);
    const [maze, setMaze] = useState(null);
    const [startAt, setStartAt] = useState(-1);
    const [endAt, setEndAt] = useState(999);

    let currentScreen;

    switch (screen) {
      case Screen.CREATE_MAZE:
        currentScreen = <CreateMaze context={context} setScreen={setScreen} />;
        break;
      case Screen.LEADER_BOARD:
        currentScreen = <LeaderBoard setScreen={setScreen} />;
        break;
      case Screen.TRANSITION:
        currentScreen = (
          <Transition
            context={context}
            setMaze={setMaze}
            setScreen={setScreen}
            setStartAt={setStartAt}
          />
        );
        break;
      case Screen.QUIZ:
        currentScreen = (
          <Quiz
            context={context}
            maze={maze}
            setEndAt={setEndAt}
            setScreen={setScreen}
          />
        );
        break;
      case Screen.END:
        currentScreen = (
          <End startAt={startAt} endAt={endAt} setScreen={setScreen} />
        );
        break;
      default:
        currentScreen = (
          <Start setScreen={setScreen} context={context} setMaze={setMaze} />
        );
    }

    return <blocks>{currentScreen}</blocks>;
  },
});

export default Devvit;
