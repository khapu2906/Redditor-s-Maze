import { Devvit } from "@devvit/public-api";

export default function End({startAt, endAt}) {
    return (
        <vstack alignment="middle center" height="100%" width="100%">
            <text>Finish! Nice job</text>
            <text>{(endAt - startAt) / (1000 * 60)} mins</text>
        </vstack>
        
    )
}
