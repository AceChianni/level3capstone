// src/components/Poll.js
"use client";

import React, { useState } from "react";

const Poll = () => {
  const [pollResults, setPollResults] = useState("");

  return (
    <div className="poll-container">
      <h2>Poll</h2>
      <input
        type="text"
        value={pollResults}
        onChange={(e) => setPollResults(e.target.value)}
        placeholder="Enter your poll answer"
      />
      <p>Your poll result: {pollResults}</p>
    </div>
  );
};

export default Poll;
