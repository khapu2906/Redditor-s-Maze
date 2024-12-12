import { Devvit, useState } from "@devvit/public-api";

export default function BackScreen({screen, setScreen}) {
    return (
        <hstack width="100%" alignment="start top" padding="medium">
            <button icon="back-fill" appearance="plain" onPress={() => setScreen(screen) } />
        </hstack>
    );
}
