import { QuizFillBlank, QuizMultipleChoice } from './../../src/entities/Quiz';
import { Level } from './../../src/entities/enums/Level';
import { StateQuiz } from './../../src/entities/enums/State';

describe('QuizFillBlank Tests', () => {
	const mockInfo = {
		content: "This is a test sentence",
		author: "Test Author",
		noiseAuthor: ["Author A", "Author B"],
		url: null
	};

	it('should create a question with a blank', () => {
		const quizFillBlank = new QuizFillBlank(Level.EASY, mockInfo);
		const questionAgg = quizFillBlank.createQuestion();

		expect(questionAgg.question).toContain('___');
		expect(questionAgg.options).toEqual([]);
	});

	it('should check the correct answer - correct', () => {
		const quizFillBlank = new QuizFillBlank(Level.EASY, mockInfo);
		const questionAgg = quizFillBlank.createQuestion();

		const correctAnswer = quizFillBlank.getCorrectAnswer();
		expect(quizFillBlank.checkAnswer(correctAnswer)).toBe(true);
	});

	it('should check the correct answer - wrong', () => {
		const quizFillBlank = new QuizFillBlank(Level.EASY, mockInfo);
		const questionAgg = quizFillBlank.createQuestion();

		const correctAnswer = quizFillBlank.getCorrectAnswer();

		expect(quizFillBlank.checkAnswer("Wrong Answer")).toBe(false);
	});
});

describe('QuizMultipleChoice Tests', () => {
	const mockInfo = {
		content: "This is a test comment",
		author: "Test Author",
		noiseAuthor: ["Author A", "Author B"],
		url: null
	};

	it('should create a multiple choice question', () => {
		const quizMultipleChoice = new QuizMultipleChoice(Level.MEDIUM, mockInfo);
		const questionAgg = quizMultipleChoice.createQuestion();

		expect(questionAgg.question).toContain('Who is author of this comment:');
		expect(questionAgg.options).toContain(mockInfo.author);
		expect(questionAgg.options).toEqual(
			expect.arrayContaining(mockInfo.noiseAuthor)
		);
	});

	it('should check the correct answer - correct', () => {
		const quizMultipleChoice = new QuizMultipleChoice(Level.MEDIUM, mockInfo);
		quizMultipleChoice.createQuestion();

		expect(quizMultipleChoice.checkAnswer(mockInfo.author)).toBe(true);
	});

	it('should check the correct answer - wrong', () => {
		const quizMultipleChoice = new QuizMultipleChoice(Level.MEDIUM, mockInfo);
		quizMultipleChoice.createQuestion();

		expect(quizMultipleChoice.checkAnswer("Wrong Author")).toBe(false);
	});
});
