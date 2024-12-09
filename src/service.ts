import Maze from "./entities/Maze"
import IMaze from "./entities/interfaces/IMaze"

import { Level, LevelMaxNode } from "./entities/enums/Level";
import { QuizType } from "./entities/enums/QuizType";
import { IExtendInfo } from "./entities/interfaces/IQuiz";

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

	async startMaze(kw: string, level: Level) {
		// start maze
		const maze = new Maze(kw, level)
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
			for (let i = 0; i < quizSizeInNode; i ++ ) {
				const typeQuizRandom = Math.floor(Math.random() * (2 - 1 + 1) + 1)

				const info: IExtendInfo = {
					content: commends[i].body,
					author: commends[i].authorName,
					url: commends[i].url,
					noiseAuthor: []
				}

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
}