import { BaseContext, Devvit } from "@devvit/public-api";
import { Maze } from "./entities/Maze.js";

import { Level, LevelMaxNode } from "./entities/enums/Level";
import { QuizType } from "./entities/enums/QuizType";
import { IExtendInfo } from "./entities/interfaces/IQuiz";
import { User } from "./entities/User";
import { State } from "./entities/enums/State";
import { ContextAPIClients, Post } from "@devvit/public-api";
import { bumpUp } from "./entities/Maze";

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
      let difficultyString;
      switch (level) {
          case Level.MEDIUM:
              difficultyString = "MEDIUM";
              break;
          case Level.HARD:
              difficultyString = "Hard";
              break;
          default:
              difficultyString = "Easy";
    }
    const post = await this.context.reddit.submitPost({
      title: `Rsmaze-${subreddit}-${difficultyString}-${Date.now()}`,
      subredditName: currentSubreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });

    const keyWord = `postPlay:${post.id}`;

    const posts: Array<any> = await this.context.reddit
      .getHotPosts({
        subredditName: subreddit,
        timeframe: "day",
        limit: LevelMaxNode[level],
        pageSize: LevelMaxNode[level],
      })
      .all();

    const maze: Maze = new Maze(this.context.postId, subreddit, level);
    for (let i = 0; i < LevelMaxNode[level]; i++) {
      if (!posts[i]) {
        break;
      }
      const commentCount = LevelMaxNode[level] / 2;
      const node = maze.createNode(posts[i].url);
      const comments = await posts[i].comments.get(commentCount);

      const quizSizeInNode = Math.floor(Math.random() * (commentCount - 1) + 1);
      let c = 0;
      let extra = 0;
      while (c < quizSizeInNode + extra && comments[c]) {
        const info: IExtendInfo = {
          content: comments[c].body.slice(0, 300),
          author: comments[c].authorName,
          url: comments[c].url,
          noiseAuthor: [],
        };

        if (this._isInvalidCmt(comments[c].body)) {
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
      node.nextNodes = bumpUp(node, maze);
    }

    const mString = JSON.stringify(maze);

    const res = await this.context.redis.set(keyWord, mString);

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

  async isMazeExist() {
    try {
      const keyWord = `postPlay:${this.context.postId}`;
      return undefined != (await this.context.redis.get(keyWord));
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async loadMaze() {
    try {
      const keyWord = `postPlay:${this.context.postId}`;
      const user = new User(this.context.userId, this.context.postId);
      const mazeString: string = await this.context.redis.get(keyWord);
      const maze = JSON.parse(mazeString);
      maze.user = user;
      return maze;
    } catch (error) {
      console.error(error);
    }
  }

  public async saveUser(maze: Maze) {
    try {
      const keyWord = `postPlay:${this.context.postId}:${this.context.userId}`;
      const keyWordLeaderBoard = `postPlay:${this.context.postId}:leaderboard`;
      const keyWordLeaderBoardNumberOfFinisher = `${keyWordLeaderBoard}:numberOfFinisher`;

      if (maze.state === State.NOT_YET || maze.state === State.WORKING) {
        throw new Error("Game not done!!");
      }

      // Kiểm tra xem người dùng đã hoàn thành hay chưa
      const existingUser = await this.context.redis.get(keyWord);
      if (!existingUser) {
        // Nếu chưa hoàn thành, tăng số người hoàn thành
        await this.context.redis.incrBy(keyWordLeaderBoardNumberOfFinisher, 1);
      } else {
        console.log(`User ${this.context.userId} already completed the game.`);
      }

      const userScore = await this.context.redis.zScore(
        keyWordLeaderBoard,
        this.context.userId,
      );

      if (!userScore || maze.completedPoint > userScore) {
        await this.context.redis.del(keyWord);
        const user = {
          ...maze.user,
          completedPoint: maze.completedPoint,
        };

        await this.context.redis.set(keyWord, JSON.stringify(user));

        // Cập nhật leaderboard
        await this.context.redis.zAdd(keyWordLeaderBoard, {
          member: this.context.userId,
          score: maze.completedPoint,
        });
      }

      // Lấy vị trí của người chơi trong bảng xếp hạng
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

      const rank = await this.context.redis.zRank(
        keyWordLeaderBoard,
        this.context.userId,
      );

      if (rank == undefined) {
        console.log("User not found in leaderboard.");
        return {
          rank: null,
          numberOfFinishers: 0,
          userScore: 0,
          topPlayer: null,
        };
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

      const topPlayer = await this.context.redis.zRange(
        keyWordLeaderBoard,
        -1,
        -1,
        { by: "rank" },
      );
      return {
        rank: numberOfFinishers - rank,
        numberOfFinishers: numberOfFinishers,
        userScore: userScore,
        topPlayer: topPlayer[0],
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

  private _isInvalidCmt(cmt: string) {
    const patternGif = /!\[gif\]\(giphy\|.*?\)/;
    const patternImg = /\[img\]\(emote\|.*?\)/;
    return patternGif.test(cmt) || patternImg.test(cmt);
  }
}
