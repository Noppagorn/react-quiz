import React,{useState} from 'react';
import logo from './logo.svg';
import QuestionCard from "./components/QuestionCard"
import {fetchQuizeQuestions} from './API'

//type
import { Difficulty, QuestionState } from "./API"

//styles
import {GlobalStyle, Wrapper} from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  correct : boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]); // this is specify type of array to array of QuestionState
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizeQuestions(TOTAL_QUESTIONS,Difficulty.EASY));
  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizeQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    )
    
    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      //user answer
      const answer = e.currentTarget.value;
      //check answer against correct answers
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1);
      }

      //Save answer in the array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    //move on to the next question of not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    }else {
      setNumber(prev => prev + 1)
    }
  }


  return (
    <>
    <GlobalStyle />
    <Wrapper>
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
        <button className="start" onClick={startTrivia}>
          Start 
        </button> : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null }
      { loading && <p>Loading Questons ...</p>}
      { !loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Questions
        </button>
      ) : null }

    </div>
    </Wrapper>
    </>
  );
}

export default App;
