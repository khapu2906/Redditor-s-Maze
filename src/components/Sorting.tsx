import { useState } from '@devvit/public-api';

const Sorting = () => {
	const [items, setItems] = useState(['Apple', 'Banana', 'Orange', 'Grape']);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const correctOrder = ['Apple', 'Banana', 'Grape', 'Orange'];

	const handleItemChange = (index: number, newItem: string) => {
		const updatedItems = [...items];
		updatedItems[index] = newItem;
		setItems(updatedItems);
	};

	const checkOrder = () => {
		if (JSON.stringify(items) === JSON.stringify(correctOrder)) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
	};

	return (
		<vstack height="100%" width="100%" gap="medium" alignment="center middle">
			<text size="large">Sort the items in alphabetical order:</text>
			{items.map((item, index) => (
				<hstack key={index} gap="small" alignment="center middle">
					<text size="medium">{`Item ${index + 1}:`}</text>
					<input
						type="text"
						value={item}
						onChange={(e) => handleItemChange(index, e.target.value)}
						placeholder="Enter item"
					/>
				</hstack>
			))}
			<button appearance="primary" onPress={checkOrder}>
				Check Order
			</button>

			{isCorrect !== null && (
				<text size="medium" color={isCorrect ? 'green' : 'red'}>
					{isCorrect ? 'Correct!' : 'Try again.'}
				</text>
			)}
		</vstack>
	);
};

export default Sorting;
