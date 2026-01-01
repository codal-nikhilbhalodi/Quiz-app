// Question.js
import React, { Component } from "react";
import Options from "./Option";

class Question extends Component {
  render() {
    const {
      question,
      selectedOption,
      onOptionChange,
      onSubmit,
      questionBank,
      currentQuestion,
      onNext,
      onPrev,
      ansSelected,
    } = this.props;

    return (
      <div className="mcq-container">
        <div className="mcq-card">
          <h4 className="question-count">
            Question {currentQuestion + 1} / {questionBank.length}
          </h4>

          <h5 className="question-text">{question.question}</h5>

          <form onSubmit={onSubmit}>
            <Options
              options={question.options}
              selectedOption={selectedOption}
              onOptionChange={onOptionChange}
              ansSelected={ansSelected}
              currentQuestion={currentQuestion}
            />

            <div className="mcq-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onPrev}
                disabled={currentQuestion === 0}
              >
                Prev
              </button>

              {currentQuestion + 1 < questionBank.length ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Question;
