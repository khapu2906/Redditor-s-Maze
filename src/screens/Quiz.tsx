import { Devvit, useState, useInterval } from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";

export default function Quiz({ context, duration, node}) {
  const [isDone, setIsDone] = useState(false);

    console.debug(node)
  let body;
  if (isDone) {
    // test getting reference to firstNode
      const urls = node.url;
    body = (
      <vstack>
          <text>{ urls }</text>
      </vstack>
    );
  } else {
    body = (
        <button onPress={() => setIsDone(true) }>
            Done
        </button>
    );
  }

  return (
    <vstack alignment="center middle" padding="medium">
      {body}
    </vstack>
  );
}
