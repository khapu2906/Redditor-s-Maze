import { Devvit, useState, useInterval} from '@devvit/public-api';

const duration = 5;

export default function Transition({startGame}) {
    const [counter, setCounter] = useState(duration);

    if (counter == 0 ) {
        startGame();
    }

    const updateInterval = useInterval(() => {
        setCounter((counter) => counter - 1);
    }, 1000);

    function startCounter() {
        updateInterval.start();
    }

    return (
        <vstack alignment="center middle" height="100%">
            <text size="xxlarge">{counter}</text>
            <button appearance="primary"
                    onPress={startCounter}
            >
                Start
            </button>
        </vstack>
    );
}
