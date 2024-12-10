import { Devvit, useState, useInterval } from "@devvit/public-api";
import Timer from "../components/Timer.js";
import FillInTheBlank from "../components/FillInTheBlank.js";

export default function Quiz({ context, duration }) {
  const [isDone, setIsDone] = useState(false);

  let body;
  if (isDone) {
    body = (
      <vstack>
        <text>Next node</text>
      </vstack>
    );
  } else {
    body = (
      <FillInTheBlank
        context={context}
        question={"QUestion"}
        answer={"Hello"}
        isDone={setIsDone}
      />
    );
  }

  return (
    <vstack alignment="center middle" padding="medium">
      <Timer duration={duration} />
      {body}
    </vstack>
  );
}
