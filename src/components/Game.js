import React, { useState, useEffect } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

const Game = ({ history }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questions = await loadQuestions();
        setQuestions(questions);
      } catch (error) {
        console.log(error);
      }
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (!currentQuestion && questions.length) changeQuestion();
  }, [questions]);

  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = (bonus = 0) => {
    if (questions.length === 0) {
      setDone(true);
      setScore(score + bonus);
      return;
    }

    const randomQuestionIndex = Math.floor(Math.random() * questions.length);

    const currentQuestion = questions[randomQuestionIndex];
    const remainingQuestions = [...questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    setQuestions(remainingQuestions);
    setCurrentQuestion(currentQuestion);
    setLoading(false);
    setScore(score + bonus);
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <>
      {loading && !done && <div id="loader"></div>}

      {!loading && !done && currentQuestion && (
        <>
          <HUD score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </>
      )}

      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
};

export default Game;
