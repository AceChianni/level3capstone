"use client";

import React, { useState } from "react";
import "/styles/poll.css";

const Poll = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const options = [
    "Naruto",
    "One Piece",
    "Attack on Titan",
    "My Hero Academia",
    "Demon Slayer",
  ];

  const handleSubmit = () => {
    if (selectedOption) {
      setSubmitted(true);
      console.log(`User voted for: ${selectedOption}`);
    } else {
      alert("Please select an option before submitting.");
    }
  };

  return (
    <div className="poll-container">
      <h2>What's Your Favorite Starter Anime?</h2>
      {submitted ? (
        <p>
          Thank you for voting! You chose: <strong>{selectedOption}</strong>.
        </p>
      ) : (
        <>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="anime-poll"
                    value={option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Poll;
