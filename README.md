# Redditor's Maze

## Overview

Redditor's Maze is a puzzle game based on posts and comments from Subreddits.
The game, as the name, have a maze that is made of post as nodes, each node have
a set of quizzes for player to answer and earn point. Quizzes are generated from
users' comments

## Objective

The ultimate goal of the game is to finish the maze by finding the last node -
Post the faster while answering as much quizzes correctly as possible

## Rules

### Create Maze

Mazes are created using by providing a Subreddit name and Difficulty which
determine the number of node and quiz per node be generated
- **Easy**: 4 Node, 4 quiz per Node
- **Medium**: 5 node, 5 quiz per node
- **Hard**: 6 Nodes, 6 quizzes per node

### Quiz

All Quizzes of a Node must be answered to advance to the next. While player are not
required to answer correctly to move on, correct answer will earn player extra
points.


### Finish Maze
The Maze is finished when player answered all the Quizzes of the last Node

## Scoring
Point is only recorded when player finish the Maze

### On Correct Answer

### On Finish Node
 
### On Difficulty 
- **Easy**: 
- **Medium**:
- **Hard**:


## Gameplay

1. **Start Game**
   - Player can choose to start an existing maze or create a new one by choosing
     a Subreddit and difficulty
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

## Leaderboard
User ranking among other finishers will be displayed
