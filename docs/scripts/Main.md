

# **Redditor's Maze - Game Rules**

## **1. Game Overview**
**Redditor's Maze** is a puzzle game based on posts and comments from Reddit.
Players navigate through a maze constructed from Reddit posts, each containing some
questions related to the post or its comments. Players must answer these
questions correctly to advance and accumulate points. Each correct answer earns
points, but the time taken to answer affects the score.

---

## **2. Game Objective**
The ultimate goal of the game is to finish the maze by finding the last node -
Post the faster while answering as much quizzes correctly as possible to finish the maze and earn the highest possible score.

---

## **3. Basic Rules**

1. **Start Game**
   - Player can choose to start an existing maze or create a new one by choosing
     a Subreddit and difficulty, then nodes in the maze will be shuffled
2. **Answer Quiz**
   - Player is first placed on the first Node of the maze
   - Player answer all quizzes in the node to move the next Node
   - An url to the related Post is displaced at the top, player can copy and
     open a new tab to find the answer
3. **Navigate Nodes**
  - After answering all the quizzes, player are presented with other nodes
  connected to the current one
  - On select a node, if all quizzes of a node is answered regardless of correctness, player will
    also be presented with connecting nodes, otherwise, player will have to
    answer all the quizzes of the node
4. **Finish Maze**
   - Once answered the last quiz of the last Node, player can end the Maze
   - On finishing the maze, player score will be calculated and recorded

***Note:*** *Remember that the score is calculated based on the time and number of completions, the player should not only answer the question but should choose a good strategy to achieve the highest score such as the distance traveled in time, and the player can Play again many times.*

---

## **4. Scoring System**

### **Max score(R1)**
- **When complete for Quiz**: 100 points
- **When complete for Node**: 200 points (When the user completes the button and does not miss any of the Quiz)
- **When complete for Maze**: 400 points (When user escape maze)

### **Base Down Score with time(R2)**
- **1-2 minutes**: 0 points
- **2-5 minutes**: 10 points
- **5-10 minutes**: 20 points
- **After 10 minutes**: 30 points

### **Base Down Score with level(R3)**
- **Easy**: -20 points
- **MEDIUM**: -10 points
- **HARD**: 0 points

### **Base Down Score Rate with time and level(R4)**
- **Easy**: 1
- **MEDIUM**: 0.6
- **HARD**: 0.3


### **Scoring formula**

**Score of Quiz (SQ)** = \( R1(\text{Quiz}) - R2 \times R4 \)

**Score of Node (SN)** = \( \left( R1(\text{Node}) - R2 \times R4 \right) \times \left( \text{number\_exact\_quiz\_in\_node} == \text{number\_quiz\_in\_node} ? 1 : 0 \right) + \left( SQ \times \text{number\_exact\_quiz\_in\_node} \right) \)

**Score of Maze (SM)** = \( \left( R1(\text{Maze}) - R2 \times R4 \right) + \left( SN \times \text{number\_node\_in\_maze} \right) \)

**Total** = \( SM \)

---

## **5. Rewards and Leaderboard**

- **Highest Score Reward**: Players with the highest scores will be celebrated
  on the leaderboard.
- **Ranking**: What rank are you in?

---

## **6. Example Gameplay**

### **Scenario**:
The player begins the game with the keyword "Python Programming" in the
"r/learnpython" subreddit. The game creates a maze from 4 Reddit posts related
to Python programming, and the player chooses **Medium** difficulty.

### **Step-by-Step Guide:**

1. **Node 1 (Reddit Post 1)**:
   - **Reddit Post**: "URL direct to post"
   - **Quiz**: "Who is the author of this comment?"
     - **Options**: A) abc, B) bca, C) ade, D) aaa
   - **Answer**: C) ade
   - **Time Taken**: 3 minutes
   - **Select the desired Node**   

2. **Node 2 (Reddit Post 2)**:
   - **Reddit Post**: "URL direct to post"
   - **Quiz**: "What ___ of Python makes it beginner-friendly?"
       *Enter answer: *
   - **Answer**: A) feature
   - **Time Taken**: 4 minutes
   - **Select the desired Node / Or the game automatically ends if it is the last node** 

---
