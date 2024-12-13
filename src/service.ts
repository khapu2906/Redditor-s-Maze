import { Maze, bumpUp } from "./entities/Maze"

import { Level, LevelMaxNode } from "./entities/enums/Level";
import { QuizType } from "./entities/enums/QuizType";
import { IExtendInfo } from "./entities/interfaces/IQuiz";
import { User } from "./entities/User";

const redditUsernames: Array<string> = [
	"FunnyToast42",
	"pixelPenguin7",
	"WanderLlama88",
	"TurboTaco25",
	"GalacticBeetle",
	"cloudCactus56",
	"SilentComet9",
	"ninjaBagel13",
	"moonlightCoder",
	"spicyPancake33",
	"VirtualOtterX",
	"solarBunny45",
	"MysticFalcon92",
	"quantumDuckie",
	"ZestyPineapple21",
	"chillSquirrel77",
	"CosmicPotatoX",
	"lazyKoala9",
	"EchoFrog101",
	"snarkyRaven88",
	"TurboSloth55",
	"WittyCactus99",
	"astroFox17",
	"FrozenMango44",
	"starryCheeseX",
	"gigaPenguin7",
	"QuantumWhiskers",
	"nebulaGoose101",
	"PancakeKnight77",
	"TurboKoala999"
];

export class Service {
	constructor(private context: any) {}

	async startMaze(kw: string, level: Level): Maze {
		// start maze
		let maze = new Maze(kw, level)
		const posts: Array<any> = await this.context.reddit.getHotPosts({
			subredditName: kw,
			timeframe: 'day',
			limit: 10,
			pageSize: 10,
		}).all();

		for (let i = 0; i < LevelMaxNode[level]; i++) {
			if (!posts[i]) {
				break;
			}
			const node = maze.createNode(posts[i].url)
			const commends = await posts[i].comments.all()
			const quizSizeInNode = Math.floor(Math.random() * (3 - 1 + 1) + 1)
			let c = 0
			let extra = 0
			while (c < quizSizeInNode + extra && commends[c]) {
				const info: IExtendInfo = {
					content: commends[c].body,
					author: commends[c].authorName,
					url: commends[c].url,
					noiseAuthor: []
				}

				c++;
				if (this._isGifUrl(commends[c].body)) {
					extra ++;
					continue;
				}

				const typeQuizRandom = Math.floor(Math.random() * (2 - 1 + 1) + 1)

				let typeQuiz
				switch (typeQuizRandom) {
					case (1):
						typeQuiz = QuizType.FILL_BLANK
						break;
					default:
						typeQuiz = QuizType.MULTIPLE_CHOICE
						info.noiseAuthor = await this.__getRandomUsernames(redditUsernames)
						break;
				}

				node.createQuiz(info, typeQuiz)
			}
		}
		maze = bumpUp(maze)

		return maze;
	}

	private async __getRandomUsernames(usernames: Array<string>) {
		const count = Math.floor(Math.random() * 3) + 1;
		const selected: Array<string> = [];

		while (selected.length < count) {
			const randomIndex = Math.floor(Math.random() * usernames.length);
			const username = usernames[randomIndex];

			if (!selected.includes(username)) {
				selected.push(username);
			}
		}
		return selected;
	}

	private _isGifUrl(url: string) {
		const pattern = /!\[gif\]\(giphy\|.*?\)/;
		return pattern.test(url);
	}
}