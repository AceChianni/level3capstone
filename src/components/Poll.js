"use client";

import React, { useState } from "react";
import "/styles/poll.css"; // Custom styles for the poll

const Poll = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0]); // Track votes for each option

  const options = [
    "Naruto",
    "One Piece",
    "Attack on Titan",
    "My Hero Academia",
    "Demon Slayer",
    "Other",
  ];

  const handleVote = (index) => {
    if (!submitted) {
      const newVotes = [...votes];
      newVotes[index] += 1; // Increment vote count for the selected option
      setVotes(newVotes);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setSubmitted(true);
      console.log(`User voted for: ${selectedOption}`);
    } else {
      alert("Please select an option before submitting.");
    }
  };

  const totalVotes = votes.reduce((acc, vote) => acc + vote, 0); // Total votes

  return (
    <div className="poll-container">
      <h2>What's Your Favorite Starter Anime?</h2>

      {submitted ? (
        <div>
          <p className="text-black">
            Thank you for voting! You chose: <strong>{selectedOption}</strong>.
          </p>

          {/* Bar Chart to Show Poll Votes */}
          <div className="mt-6 space-y-2">
            {votes.map((vote, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="bg-blue-500 text-black text-xs py-1 px-4 rounded-md"
                  style={{
                    width: `${(vote / totalVotes) * 100}%`, // Calculate width based on vote count
                  }}
                >
                  {options[index]} ({vote} votes)
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Poll Options */}
          <ul className="text-black">
            {options.map((option, index) => (
              <li key={index} className="poll-option">
                <label>
                  <input
                    type="radio"
                    name="anime-poll"
                    value={option}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      handleVote(index); // Track votes when user selects an option
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {/* Heart-shaped Submit Button */}
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center bg-pink-500 text-white p-3 rounded-full space-x-2 hover:bg-pink-600 mt-4"
          >
            <span className="text-3xl">💖</span> {/* Heart emoji */}
            <span className="font-bold">Submit</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Poll;
