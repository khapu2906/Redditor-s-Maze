import { Devvit, useState, ContextAPIClients } from "@devvit/public-api";

export default function Answer({ isCorrect, point }) {
  if (isCorrect) {
    return (
      <vstack
        padding="medium"
        width="100%"
        alignment="middle center"
        gap="medium"
      >
        <icon size="large" name="joined-outline" color="success-plain" />
        <text size="xlarge">+ {point}</text>
      </vstack>
    );
  }

  return (
    <vstack
      padding="medium"
      width="100%"
      alignment="middle center"
      gap="medium"
    >
      <icon size="large" name="clear-outline" color="danger-plain" />
      <text size="xlarge">+ 0</text>
    </vstack>
  );
}
