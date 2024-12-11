// Learn more at developers.reddit.com/docs
import { Devvit, useAsync, useState } from "@devvit/public-api";
import Start from "./screens/Start.js";
import Transition from "./screens/Transition.js";
import Maze from "./entities/Maze.js";
import { Service } from "./service.js";
import Timer from "./components/Timer.js";
import Quiz from "./screens/Quiz.js";
import { Level } from "./entities/enums/Level.js";

Devvit.configure({
  redditAPI: true,
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
    const [screen, setScreen] = useState(0);
    const {
      data: maze,
      loading,
      error,
    } = useAsync(
      async () => await new Service(context).startMaze("gaming", Level.EASY),
    );
    const [service, setService] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [difficulty, setDifficulty] = useState(Level.EASY);

    let currentScreen = loading ? (
      <text>Loading maze</text>
    ) : (
      <Quiz context={context} duration={10000} node={maze.getFirstNode()} />
    );

    if (error) {
      currentScreen = <text>Error getting subreddit</text>;
    }

    return <blocks>{currentScreen}</blocks>;
  },
});

export default Devvit;
