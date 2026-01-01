// App.js

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            ansSelected: {},
        };
    }

    handleOptionChange = (e) => {
        const { questionBank, currentQuestion, selectedOption, score, ansSelected } = this.state;
        this.setState({ selectedOption: e.target.value });
        ansSelected[currentQuestion] = e.target.value;
    };

    handleFormSubmit = (e) => {
        e.preventDefault(); 
        this.checkAnswer();
        this.setState({ quizEnd: true });
    };

    checkAnswer = () => {
        const { questionBank, currentQuestion, selectedOption, score, ansSelected } = this.state;
        for (let i = 0; i < questionBank.length; i++) {
            if (ansSelected[i] === questionBank[i].answer) {
                this.setState((prevState) => ({ score: prevState.score + 1 }));
            }
        }
    };

    handleNextQuestion = () => {
        const { questionBank, currentQuestion, selectedOption, ansSelected } = this.state;
        if (!selectedOption) {
            alert("Please select an option");
            return;
        }
        ansSelected[currentQuestion] = selectedOption;
        this.setState((prevState) => ({
            currentQuestion: prevState.currentQuestion + 1,
            selectedOption: ansSelected[currentQuestion + 1] || "",
        }));
    };
    handlePrev = () => {
        const { questionBank, currentQuestion, selectedOption, ansSelected } = this.state;
        this.setState((prev) => ({
            currentQuestion: prev.currentQuestion - 1,
            selectedOption: ansSelected[currentQuestion - 1] || "",
        }));
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd, ansSelected } =
            this.state;
        return (
            <div className="App d-flex flex-column align-items-center justify-content-center">
                <h1 className="app-title">QUIZ APP</h1>
                {!quizEnd ? (
                    <Question
                        question={questionBank[currentQuestion]}
                        selectedOption={selectedOption}
                        currentQuestion={currentQuestion}
                        questionBank={questionBank}
                        onOptionChange={this.handleOptionChange}
                        onPrev={this.handlePrev}
                        onNext={this.handleNextQuestion}
                        ansSelected={ansSelected}
                        onSubmit={this.handleFormSubmit}
                    />
                ) : (
                    <Score
                        score={score}
                        questionBankLength={questionBank.length}
                        className="score"
                    />
                )}
            </div>
        );
    }
}

export default App;