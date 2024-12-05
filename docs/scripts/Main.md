
# **Redditor's Maze - Game Script**

## **1. Game Overview**

**Redditor's Maze** is a puzzle game based on Reddit posts and comments. Players will navigate through a maze constructed from Reddit posts, where each post contains a question related to the post or its comments. Players need to answer the questions correctly to progress and collect points. Each correct answer awards points, but the time taken to answer will affect the points awarded.

---

## **2. Game Objective**
- Players must answer questions related to Reddit posts correctly and quickly to progress through the maze.
- Each post acts as a "level" in the game, and players must complete as many levels as possible to score higher points.
- The ultimate goal is to reach the end of the maze and accumulate the highest possible score.

---

## **3. Basic Rules**

1. **Choose a Keyword/Hashtag**:
   - The player enters a keyword or hashtag (if there are multiple posts) to create the maze from available Reddit posts.
   - The difficulty of the game is determined based on the number of posts and the number of questions in each post.

2. **Choose Difficulty Level**:
   - **Easy**: 3-5 questions, answer time for each question 2-3 minutes.
   - **Medium**: 6-8 questions, answer time for each question 3-5 minutes.
   - **Hard**: 9-12 questions, answer time for each question 5-10 minutes.

3. **Answer Questions**:
   - Each question will have a time limit for answering.
   - Correct answers within the time limit will earn the player points.

---

## **4. Scoring System**

### **Points per Question**
- **1-2 minutes**: 10 points
- **2-5 minutes**: 7 points
- **5-10 minutes**: 5 points
- **After 10 minutes**: 2 points

### **Points for Completing Each Level (Reddit Post)**
- **Complete Level (a Reddit post)**:
  - **20 points base** if the player completes the level.
  - This will decrease based on the time taken to complete the level:
    - **Completed in 2 minutes**: 20 points.
    - **Completed in 2-5 minutes**: 15 points.
    - **Completed in 5-10 minutes**: 10 points.
    - **After 10 minutes**: 5 points.

### **Difficulty-Based Points**
- **Easy**: 10 points/question, 20 points/level (Max 50-70 points).
- **Medium**: 7 points/question, 15 points/level (Max 60-100 points).
- **Hard**: 5 points/question, 10 points/level (Max 120-200 points).

### **Total Points**
- **Points per Reddit Post**: 20 points (plus bonus points based on completion time).
- **Total Game Points**:
  - Total Points = Total Correct Answers × Answer Points (based on time) + Level Points (20 points/level).
  
### **Additional Bonus for Completing the Maze**
- **Completing the entire maze** (finishing all the posts in the game) will grant an **additional 30 points** as a final bonus for completing the entire challenge.

---

## **5. Gameplay Flow**

1. **Start the Game**:
   - The player enters a keyword/hashtag to find relevant posts on Reddit.
   - The player chooses the difficulty level (Easy, Medium, Hard).

2. **Play Level 1**:
   - Each Reddit post serves as a level in the game.
   - The player must answer the question related to the post correctly.
   - Correct answers within the given time earn points.

3. **Proceed to Next Level**:
   - After completing a level, the player proceeds to the next post.
   - Points from answers and time taken will accumulate.

4. **Finish the Game**:
   - The player continues playing until all posts are completed or cannot answer any more questions correctly.
   - The final score is calculated by adding up the points from all levels and any bonus points for completing the maze.

---

## **6. Rewards**
- **Highest Scores**: Players with the highest scores are recognized on a leaderboard.
- **Time-Based Rewards**: Rewards may also be given for answering quickly or completing challenging posts.

---

## **7. Completing Each Reddit Post**
- **Related Questions**: Questions in each post are generated automatically based on the content of the post and its comments.
- **Completion Criteria**: Answering all questions correctly within the time limit will unlock the next Reddit post in the maze.

---

## **8. Leaderboard**
- The leaderboard will display the top players with the highest total points, encouraging players to compete for better scores.

---

**Note**: Points and the number of questions will vary depending on the difficulty of the posts and the time taken by the player to answer. Questions will be dynamically created based on the Reddit post and its comments.

--- 


## **9. Example Gameplay**

### **Scenario:**
- The player starts the game with the keyword “Python Programming” in the subreddit "r/learnpython". The game generates a maze from 4 Reddit posts related to Python programming, and the player selects the **Medium** difficulty level.

### **Step-by-Step Walkthrough:**

1. **Level 1 (Reddit Post 1)**:
   - **Reddit Post**: "What are some of the best resources for learning Python?"
   - **Question**: "Which of the following is NOT a recommended resource for learning Python?"
     - **Options**: A) Python Docs, B) Codecademy, C) JavaScript Docs, D) Real Python
   - **Answer**: C) JavaScript Docs
   - **Time Taken**: 3 minutes
   - **Points Awarded**: 7 points (for answering in 2-5 minutes) + 15 points for completing the level (as it's medium difficulty).
   - **Total Points for Level 1**: **22 points**

2. **Level 2 (Reddit Post 2)**:
   - **Reddit Post**: "Why is Python considered an easy language to learn?"
   - **Question**: "What feature of Python makes it beginner-friendly?"
     - **Options**: A) Simple syntax, B) High-performance speed, C) Advanced libraries, D) Low-level access to hardware
   - **Answer**: A) Simple syntax
   - **Time Taken**: 4 minutes
   - **Points Awarded**: 7 points (for answering in 2-5 minutes) + 15 points for completing the level.
   - **Total Points for Level 2**: **22 points**

3. **Level 3 (Reddit Post 3)**:
   - **Reddit Post**: "What are some best practices in Python programming?"
   - **Question**: "Which of the following is a Python best practice?"
     - **Options**: A) Avoid using comments, B) Use proper indentation, C) Write code without testing, D) Avoid using functions
   - **Answer**: B) Use proper indentation
   - **Time Taken**: 6 minutes
   - **Points Awarded**: 5 points (for answering in 5-10 minutes) + 15 points for completing the level.
   - **Total Points for Level 3**: **20 points**

4. **Level 4 (Reddit Post 4)**:
   - **Reddit Post**: "How do I optimize my Python code for better performance?"
   - **Question**: "Which technique can significantly improve the performance of a Python program?"
     - **Options**: A) Using a faster interpreter, B) Using list comprehensions instead of loops, C) Writing all code in one file, D) Avoiding all external libraries
   - **Answer**: B) Using list comprehensions instead of loops
   - **Time Taken**: 2 minutes
   - **Points Awarded**: 10 points (for answering in 1-2 minutes) + 15 points for completing the level.
   - **Total Points for Level 4**: **25 points**

---

### **Final Score Calculation**:
- **Level 1**: 22 points
- **Level 2**: 22 points
- **Level 3**: 20 points
- **Level 4**: 25 points

**Total Points**: 22 + 22 + 20 + 25 = **89 points**

### **Bonus for Completing the Maze**: 
- Since the player completed the entire maze, they receive **30 bonus points**.

**Final Total**: **119 points**

---