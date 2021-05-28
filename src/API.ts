import { shuffleArray }  from "./utils"
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}


export type QuestionState = Question & { answers: string[] }; // this is use type of question but adding answer porperty

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = "hard",
}
export const fetchQuizeQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json(); // first await is await for fecth data and seccond is await for convert to json
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer
            ])
        }
    ))

}