import { BaseContext, Devvit } from "@devvit/public-api";
import { Maze } from "./entities/Maze.js";

import { Level, LevelMaxNode } from "./entities/enums/Level";
import { QuizType } from "./entities/enums/QuizType";
import { IExtendInfo } from "./entities/interfaces/IQuiz";
import { User } from "./entities/User";
import { State } from "./entities/enums/State";
import { ContextAPIClients, Post } from "@devvit/public-api";
import { bumpUp } from "./entities/Maze.js";

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
  "TurboKoala999",
];

export class Service {
  constructor(private context: ContextAPIClients & BaseContext) {}

  public async createMaze({
    subreddit,
    level,
  }: {
    subreddit: string;
    level: Level;
  }): Promise<Post> {
    const currentSubreddit = await this.context.reddit.getCurrentSubreddit();
    const post = await this.context.reddit.submitPost({
      title: "Rsmaze",
      subredditName: currentSubreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });

    const keyWord = `postPlay:${post.id}`;

    const res = await this.context.redis.set(
      keyWord,
      JSON.stringify({
        kw: subreddit,
        level,
      }),
    );

    return post;
  }

  public async configMaze(postId: string, kw: string, level: Level) {
    const keyWord = `postPlay:${postId}`;

    await this.context.redis.set(
      keyWord,
      JSON.stringify({
        kw,
        level,
      }),
    );
  }

  async loadMaze(): Maze {
    try {
      const keyWord = `postPlay:${this.context.postId}`;
      const mazeConfig = await this.context.redis.get(keyWord);
      const { kw, level } = JSON.parse(mazeConfig);
      // start maze
      const user = new User(this.context.userId, this.context.postId);
      const maze: Maze = new Maze(this.context.postId, kw, level, user);
      const posts: Array<any> = await this.context.reddit
        .getHotPosts({
          subredditName: kw,
          timeframe: "day",
          limit: LevelMaxNode[level],
          pageSize: LevelMaxNode[level],
        })
        .all();

      for (let i = 0; i < LevelMaxNode[level]; i++) {
        if (!posts[i]) {
          break;
        }
        const commentCount = LevelMaxNode[level] / 2;
        const node = maze.createNode(posts[i].url);
        const comments = await posts[i].comments.get(commentCount);

        const quizSizeInNode = Math.floor(
          ( Math.random() * (commentCount - 1) ) + 1,
        );
        let c = 0;
        let extra = 0;
        while (c < quizSizeInNode + extra && comments[c]) {
          const info: IExtendInfo = {
            content: comments[c].body.slice(0, 300),
            author: comments[c].authorName,
            url: comments[c].url,
            noiseAuthor: [],
          };

          if (this._isGifUrl(comments[c].body)) {
            c++;
            extra++;
            continue;
          }
          c++;

          const typeQuizRandom = Math.floor(Math.random() * (2 - 1 + 1) + 1);

          let typeQuiz;
          switch (typeQuizRandom) {
            case 1:
              typeQuiz = QuizType.FILL_BLANK;
              break;
            default:
              typeQuiz = QuizType.MULTIPLE_CHOICE;
              info.noiseAuthor = this.__getRandomUsernames(redditUsernames);
              break;
          }

          node.createQuiz(info, typeQuiz);
        }
      }

        for (const node of maze.nodes) {
            node.nextNodes = bumpUp(node, maze) 
        }

      return maze;
    } catch (error) {
      console.error(error);
    }
  }

  public async saveUser(maze: Maze) {
    try {
      const keyWord = `postPlay:${this.context.postId}:${this.context.userId}`;

      await this.context.redis.del(keyWord);

      if (maze.state === State.NOT_YET || maze.state === State.WORKING) {
        throw new Error("Game not done!!");
      }

      const user = {
        ...maze.user,
        completedPoint: maze.completedPoint,
      };

      await this.context.redis.set(keyWord, JSON.stringify(user));

      // Leaderboard Keys
      const keyWordLeaderBoard = `postPlay:${this.context.postId}:leaderboard`;
      const keyWordLeaderBoardNumberOfFinisher = `${keyWordLeaderBoard}:numberOfFinisher`;

      await this.context.redis.zAdd(keyWordLeaderBoard, {
        member: this.context.userId,
        score: maze.completedPoint,
      });

      await this.context.redis.incrBy(keyWordLeaderBoardNumberOfFinisher, 1);

      const rank = parseInt(
        await this.context.redis.zRank(keyWordLeaderBoard, this.context.userId),
      );

      console.log(
        `User ${this.context.userId} completed with rank: ${rank + 1}`,
      );

      return rank;
    } catch (error) {
      console.error(error);
      throw new Error("Game error!!");
    }
  }

  public async getLeaderBoard() {
    try {
      const keyWordLeaderBoard = `postPlay:${this.context.postId}:leaderboard`;

      const rank = parseInt(
        await this.context.redis.zRank(keyWordLeaderBoard, this.context.userId),
      );

      if (rank === null) {
        console.log("User not found in leaderboard.");
        return { rank: null, numberOfFinishers: 0, userScore: 0 };
      }
      const keyWordLeaderBoardNumberOfFinisher = `${keyWordLeaderBoard}:numberOfFinisher`;
      const numberOfFinishers = parseInt(
        await this.context.redis.get(keyWordLeaderBoardNumberOfFinisher),
        10,
      );

      const userScore = parseInt(
        await this.context.redis.zScore(
          keyWordLeaderBoard,
          this.context.userId,
        ),
      );

      console.log(`User rank: ${rank + 1}, Score: ${userScore}`);
      return {
        rank: rank + 1,
        numberOfFinishers: numberOfFinishers,
        userScore: userScore,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Game error!!");
    }
  }

  public async isSubredditExist(name: string) {
    try {
      return null != (await this.context.reddit.getSubredditInfoByName(name));
    } catch (error) {
      return false;
    }
  }

  private __getRandomUsernames(usernames: Array<string>) {
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
