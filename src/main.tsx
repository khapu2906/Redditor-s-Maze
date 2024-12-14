// Learn more at developers.reddit.com/docs
import { Devvit, useAsync, useState } from "@devvit/public-api";
import Start from "./screens/Start.js";
import Transition from "./screens/Transition.js";
import { start as startMaze } from "./entities/Maze.js";
import Quiz from "./screens/Quiz.js";
import { Screen } from "./entities/enums/Screen.js";
import End from "./screens/End.js";
import CreateMaze from "./screens/CreateMaze.js";
import LeaderBoard from "./screens/LeaderBoard.js";
import { bumpUp } from "./entities/Maze.js";
import Answer from "./components/CheckAnswer.js";
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

Devvit.addCustomPostType({
  name: "Experience Post",
  height: "tall",
  render: (context) => {
    const [screen, setScreen] = useState(Screen.START);
    const [maze, setMaze] = useState(null);
    const [startAt] = useState(-1);
    const [endAt, setEndAt] = useState(999);
    const [quizIndex, setQuizIndex] = useState(0);
    const [nodeIndex, setNodeIndex] = useState(0);

    let currentScreen;

    switch (screen) {
      case Screen.SELECT_NODE:
        currentScreen = (
          <SelectNode
            node={nodeIndex}
            maze={maze}
            setNodeIndex={setNodeIndex}
            setQuizIndex={setQuizIndex}
            setScreen={setScreen}
          />
        );
        break;
      case Screen.CHECK_ANSWER:
        currentScreen = (
          <CheckAnswer
            quizIndex={quizIndex}
            setQuizIndex={setQuizIndex}
            setScreen={setScreen}
            maze={maze}
            setMaze={setMaze}
            nodeIndex={nodeIndex}
            setNodeIndex={setNodeIndex}
          />
        );
        break;
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
          />
        );
        break;
      case Screen.QUIZ:
        currentScreen = (
          <Quiz
            context={context}
            nodeIndex={nodeIndex}
            quizIndex={quizIndex}
            setScreen={setScreen}
            maze={maze}
            setMaze={setMaze}
            setNodeIndex={setNodeIndex}
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
