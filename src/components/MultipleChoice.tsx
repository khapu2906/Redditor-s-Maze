import { useState } from '@devvit/public-api';

const MultipleChoice = () => {
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const question = 'Which programming language is used in Devvit?';
	const options = ['JavaScript', 'Python', 'Java', 'Ruby'];
	const correctAnswerIndex = 0; // JavaScript is the correct answer

	const checkAnswer = () => {
		if (selectedOption === correctAnswerIndex) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
	};

	return (
		<vstack height="100%" width="100%" gap="medium" alignment="center middle">
			<text size="large">{question}</text>
			{options.map((option, index) => (
				<button
					key={index}
					appearance="primary"
					onPress={() => setSelectedOption(index)}
					style={{
						backgroundColor: selectedOption === index ? 'lightblue' : 'white',
					}}
				>
					{option}
				</button>
			))}
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

export default MultipleChoice;
