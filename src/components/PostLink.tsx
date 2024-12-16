import { Devvit, ContextAPIClients, Dispatch } from "@devvit/public-api";

export default function PostLink({
  context,
  url,
}: {
  url: string;
  context: ContextAPIClients;
}) {
  async function navigate() {
    context.ui.showToast("Please copy the url to another tab!");
  }
  return (
    <hstack gap="small" width="100%">
      <text>Post:</text>
      <text color="interactive-focused" onPress={navigate}>
        {url}
      </text>
    </hstack>
  );
}
