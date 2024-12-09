// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";
import Start from "./screens/Start.js";
import Transition from "./screens/Transition.js";
import Maze from "./entities/Maze.js";

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

// Add a post type definition
Devvit.addCustomPostType({
  name: "Experience Post",
  height: "regular",
  render: (context) => {
    const [screen, setScreen] = useState(0);
      const [maze, setMaze] = useState(null)

    let currentScreen = (
      <Start context={context} transition={transition} setMaze={setMaze} />
    );

    switch (screen) {
      case 1:
        currentScreen = <Transition startGame={startGame} maze={maze} />;
        break;
      case 2:
        // start game
        break;
      default:
        currentScreen = (
          <Start context={context} transition={transition} setMaze={setMaze} />
        );
    }

    function startGame() {
      setScreen(2);
    }

    function transition() {
      setScreen(1);
    }

    return <blocks>{currentScreen}</blocks>;
  },
});

export default Devvit;
