import { useState } from '@devvit/public-api';

const FillInTheBlanks = () => {
	const [answer, setAnswer] = useState('');
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const correctAnswer = 'Devvit';

	const checkAnswer = () => {
		if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
	};

	return (
		<vstack height="100%" width="100%" gap="medium" alignment="center middle">
			<text size="large">Fill in the blank:</text>
			<text size="medium">Devvit is a powerful tool for building apps on Reddit.</text>
			<input
				type="text"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				placeholder="Your answer"
			/>
			<button appearance="primary" onPress={checkAnswer}>
				Check Answer
			</button>

			{isCorrect !== null && (
				<text size="medium" color={isCorrect ? 'green' : 'red'}>
					{isCorrect ? 'Correct!' : 'Try again.'}
				</text>
			)}
		</vstack>
	);
};

export default FillInTheBlanks;
