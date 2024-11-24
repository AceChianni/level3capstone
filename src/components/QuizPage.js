"use client";

import React, { useState } from "react";

const GENRE_IDS = {
  Drama: "Drama",
  Comedy: "Comedy",
  Action: "Action",
  Fantasy: "Fantasy",
  "Science Fiction": "Sci-Fi",
  "Serious and deep": "Drama",
  "Funny and quirky": "Comedy",
  "Brave and adventurous": "Adventure",
  "Magical and mystical": "Fantasy",
  "Intelligent and innovative": "Sci-Fi",
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
  "Serious and intense": "Drama",
  "Light-hearted and fun": "Comedy",
  "Mysterious and suspenseful": "Mystery",
  "Whimsical and magical": "Fantasy",
  "Futuristic and innovative": "Sci-Fi",
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What genre of anime do you prefer?",
      options: ["Drama", "Comedy", "Action", "Fantasy"],
    },
    {
      id: 2,
      question: "What type of mood do you enjoy?",
      options: [
        "Serious and deep",
        "Funny and quirky",
        "Light-hearted and humorous",
        "Brave and adventurous",
      ],
    },
    // Add more questions here as needed
  ];

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = value;
      return updatedAnswers;
    });
  };

  const showNextQuestion = () => {
    if (selectedAnswers[currentQuestion]) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitQuiz();
      }
    } else {
      alert("Please answer the question before proceeding.");
    }
  };

  const submitQuiz = async () => {
    if (selectedAnswers.length === questions.length) {
      setIsLoading(true);
      await fetchRecommendations();
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const fetchRecommendations = async () => {
    const genreNames = selectedAnswers.map((answer) => GENRE_IDS[answer]);
    const uniqueGenreNames = [...new Set(genreNames)];

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
            }
        `;

    const variables = {
      genres: uniqueGenreNames,
    };

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.data.Page.media.length > 0) {
        displayRecommendations(data.data.Page.media);
      } else {
        setRecommendations(
          "No recommendations found. Try again with different options."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setRecommendations(
        "Failed to fetch recommendations. Please try again later."
      );
      console.error("Error fetching recommendations:", error);
    }
  };

  const displayRecommendations = (animeList) => {
    setRecommendations(
      animeList.map((anime) => (
        <div key={anime.title.romaji} className="anime-item">
          <h3>{anime.title.romaji}</h3>
          <img src={anime.coverImage.large} alt={anime.title.romaji} />
          <p>{anime.description}</p>
          <a href={anime.siteUrl} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </div>
      ))
    );
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setRecommendations(null);
  };

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <form>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={selectedAnswers[currentQuestion] === option}
                  onChange={handleAnswerChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </form>
          <button onClick={showNextQuestion}>Next</button>
        </div>
      )}

      {isLoading && <p>Loading recommendations...</p>}

      {recommendations && (
        <div>
          {Array.isArray(recommendations) ? (
            recommendations
          ) : (
            <p>{recommendations}</p>
          )}
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
