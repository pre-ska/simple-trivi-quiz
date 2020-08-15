import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      this.setState(
        {
          questions
        },
        () => this.changeQuestion()
      );
    } catch (error) {
      console.log(error);
    }
  }

  changeQuestion = (bonus = 0) => {
    if (this.state.questions.length === 0) {
      return this.setState(prevState => ({
        done: true,
        score: prevState.score + bonus
      }));
    }

    const randomQuestionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );

    const currentQuestion = this.state.questions[randomQuestionIndex];
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    this.setState(prevState => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: prevState.score + bonus,
      questionNumber: prevState.questionNumber + 1
    }));
  };

  render() {
    const {
      loading,
      done,
      score,
      currentQuestion,
      questionNumber
    } = this.state;
    return (
      <>
        {loading && !done && <div id="loader"></div>}

        {!loading && !done && currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}

        {done && <SaveScoreForm score={score} />}
      </>
    );
  }
}
