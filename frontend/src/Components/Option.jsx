// Option.js
import React, { Component } from "react";

class Options extends Component {
  render() {
    const {
      options,
      selectedOption,
      onOptionChange,
      ansSelected,
      currentQuestion,
    } = this.props;

    return (
      <div className="options-wrapper">
        {options.map((option, index) => {
          const isChecked = ansSelected[currentQuestion]
            ? ansSelected[currentQuestion]["option"] === option
            : selectedOption === option;

          return (
            <label
              key={index}
              className={`option-card ${isChecked ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={isChecked}
                onChange={onOptionChange}
              />
              <span className="custom-radio" />
              <span className="option-text">{option}</span>
            </label>
          );
        })}
      </div>
    );
  }
}

export default Options;
