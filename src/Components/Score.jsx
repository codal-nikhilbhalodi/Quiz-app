// Score.js
import React, { Component } from "react";
import "../App.css";

class Score extends Component {
  render() {
    const { score, questionBankLength } = this.props;

    return (
      <div className="mcq-container">
        <div className="score-card">
          <h2 className="score-title">Results</h2>

          <p className="score-value">
            Your score:
            <span className="score-numbers">
                <span className="score-obtained">{score}</span>
                <span className="score-separator"> / </span>
                <span className="score-total">{questionBankLength}</span>
            </span>
            </p>

          <button
            className="btn score-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}

export default Score;
