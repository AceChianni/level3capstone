"use client";

import React, { useState } from "react";

const GENRE_IDS = {
  Drama: "Drama",
  Comedy: "Comedy",
  Action: "Action",
  Fantasy: "Fantasy",
  Romance: "Romance",
  "Serious and deep": "Drama",
  "Funny and quirky": "Comedy",
  "Brave and adventurous": "Adventure",
  "Magical and mystical": "Fantasy",
  "Heartwarming and romantic": "Romance",
  "Emotionally gripping": "Drama",
  "Light-hearted and humorous": "Comedy",
  "Full of thrilling battles": "Action",
  "Involving supernatural elements": "Supernatural",
  "Exploring futuristic concepts": "Sci-Fi",
  "Urban cityscape": "Slice of Life",
  "Rural countryside": "Slice of Life",
  "Fantasy world": "Fantasy",
  "Outer space": "Sci-Fi",
  "Historical era": "Historical",
  "A romantic getaway": "Romance",
  "Serious and intense": "Drama",
  "Light-hearted and fun": "Comedy",
  "Mysterious and suspenseful": "Mystery",
  "Whimsical and magical": "Fantasy",
  "Futuristic and innovative": "Sci-Fi",
  "Passionate and emotional": "Romance",
};

const QuizPage = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // state for popup visibility
  const [quizFinished, setQuizFinished] = useState(false); // state to track if quiz is finished

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = value;
      return updated;
    });
  };

  const showNextQuestion = () => {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setIsLoading(true);
    const genres = selectedAnswers.map((answer) => GENRE_IDS[answer]);
    const uniqueGenres = [...new Set(genres)];

    const query = `
      query ($genres: [String]) {
        Page(perPage: 5) {
          media(genre_in: $genres, type: ANIME, sort: POPULARITY_DESC) {
            title {
              romaji
            }
            coverImage {
              large
            }
            description
            siteUrl
          }
        }
      }`;

    const variables = { genres: uniqueGenres };

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const { data } = await response.json();
      if (data.Page.media.length > 0) {
        setRecommendations(data.Page.media);
      } else {
        if (!showPopup) {
          // Only show popup once
          setShowPopup(true); // Show the popup if no recommendations
        }
      }
      setQuizFinished(true); // Mark quiz as finished after submission
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreRecommendations = () => {
    if (recommendations.length < 10) {
      alert(
        "No more recommendations available. Please try restarting the quiz."
      );
      if (!showPopup) {
        // Only show popup once
        setShowPopup(true); // Show the popup if there are no more recommendations
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setRecommendations(null);
    setShowPopup(false);
    setQuizFinished(false); // Reset the quiz status
  };

  return (
    <div className="quiz-container">
      {!quizFinished && questions[currentQuestion] && (
        <div className="quiz-card">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="question">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswers[currentQuestion] === option}
                  onChange={handleAnswerChange}
                />
                {option}
              </label>
            ))}
          </div>
          {currentQuestion < questions.length - 1 ? (
            <button onClick={showNextQuestion}>Next Question</button>
          ) : (
            <button onClick={submitQuiz}>Get Results</button>
          )}
        </div>
      )}

      {/* Recommendations Section */}
      {quizFinished && recommendations && recommendations.length > 0 && (
        <div className="results-card">
          <h3 className="recommendations-title">Your Recommendations</h3>
          {recommendations.map((anime, index) => (
            <div className="anime-item" key={index}>
              <h3>{anime.title.romaji}</h3>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <p>{anime.description}</p>
              <a href={anime.siteUrl} target="_blank" rel="noopener noreferrer">
                Go to site
              </a>
            </div>
          ))}
          <button
            className="load-more-button"
            onClick={loadMoreRecommendations}
          >
            Load More
          </button>
        </div>
      )}

      {/* Reset Quiz Button */}
      <button onClick={resetQuiz} className="reset-button">
        Reset Quiz
      </button>

      {/* Popup Alert */}
      {showPopup && (
        <div className="popup-alert active">
          <h4>Oops! No More Recommendations</h4>
          <p>
            It looks like there are no more recommendations. Please try
            restarting the quiz.
          </p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
