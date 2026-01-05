// quizPage.jsx

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Question";
import Score from "./Score";
import "../css/quiz.css";
import { getQuestions, submitQuiz } from "../api/quizApi";
import Loader from "./Loader";


class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            ansSelected: {},
            loading: true,
        };
    }
    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions = async () => {
        try {
            const res = await getQuestions();
            this.setState({
                questionBank: res.data,
                loading: false,
            });
        } catch (error) {
            console.error("Failed to load questions", error);
        }
    };

    handleOptionChange = (e) => {
        const { questionBank, currentQuestion, selectedOption, score, ansSelected } = this.state;
        const questionId = questionBank[currentQuestion].id;
        this.setState({ selectedOption: e.target.value });
        ansSelected[currentQuestion] = { id: questionId, option: e.target.value }
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await submitQuiz(this.state.ansSelected);
            this.setState({
                score: res.data.score,
                quizEnd: true,
            });
        } catch (error) {
            console.error("Quiz submission failed", error);
        }
    };


    handleNextQuestion = () => {
        const { questionBank, currentQuestion, selectedOption, ansSelected } = this.state;
        if (!selectedOption) {
            alert("Please select an option");
            return;
        }
        ansSelected[questionBank[currentQuestion]["id"]] = selectedOption;
        this.setState((prevState) => ({
            currentQuestion: prevState.currentQuestion + 1,
            selectedOption: ansSelected[currentQuestion + 1]["option"] || "",
        }));
    };
    handlePrev = () => {
        const { questionBank, currentQuestion, selectedOption, ansSelected } = this.state;
        this.setState((prev) => ({
            currentQuestion: prev.currentQuestion - 1,
            selectedOption: ansSelected[currentQuestion - 1]["option"] || "",
        }));
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd, ansSelected, loading} =
        this.state;
        if (loading) return <Loader />;
        return (
            <div className="Quiz d-flex flex-column align-items-center justify-content-center">
                <h1 className="quiz-title">QUIZ APP</h1>
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

export default Quiz;