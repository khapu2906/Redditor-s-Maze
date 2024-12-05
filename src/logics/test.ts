// Hàm tạo câu hỏi từ đoạn văn bản
export const generateQuestionFromText = (text: string) => {
	// Ví dụ đơn giản: Cắt câu đầu tiên và tạo câu hỏi
	const sentences = text.split('.');
	const question = sentences[0] + "?"; // Câu hỏi đơn giản từ câu đầu tiên
	const options = ["True", "False"]; // Các lựa chọn trả lời
	const correctAnswer = "True"; // Đáp án đúng giả định là 'True'

	return {
		question,
		options,
		answer: correctAnswer
	};
};
