import { Devvit, useState, useInterval, UseIntervalResult } from "@devvit/public-api";

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

export default function Timer({duration} : {duration : number}) {
    const [time, setTime] = useState(duration);


    // this hook behave differently from react's
    const interval =  
        useInterval(() => {

            setTime(time - 1000);
        }, 1000);

    interval.start();
    if (0 >= time) {
        interval.stop();
    }


    return (
        <vstack alignment="center middle" height="100%">
            <text size="xxlarge">{time}</text>
        </vstack>
    );
}
