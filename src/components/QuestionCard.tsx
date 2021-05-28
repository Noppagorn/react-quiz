import React from 'react'
//styled
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';


//types
import {AnswerObject} from "../App"
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void; // specify this function return nothing
    userAnswer: AnswerObject | undefined ;
    questionNr: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({ question ,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
    return (
        <Wrapper>
        <div>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question}}></p>
            <div>
                {answers.map(answer => (
                    <ButtonWrapper 
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>

        </div>
        </Wrapper>
    )
}
export default QuestionCard;