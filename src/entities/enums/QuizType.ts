
import { QuizFillBlank, QuizMultipleChoice } from "./../Quiz"

export enum QuizType {
	FILL_BLANK,
	MULTIPLE_CHOICE
}

export const QuizTypeClass =  {
	[QuizType.FILL_BLANK]: QuizFillBlank,
	[QuizType.MULTIPLE_CHOICE]: QuizMultipleChoice
}