// App.js

import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./Components/quizPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
