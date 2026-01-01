// components/Loader.jsx
import React from "react";

const Loader = () => {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <div className="dot dot1"></div>
          <div className="dot dot2"></div>
          <div className="dot dot3"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  };

export default Loader;
