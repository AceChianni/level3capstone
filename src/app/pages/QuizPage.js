import React, { useState } from "react";
import "../styles/quizstyles.css";
import { fetchRecommendations } from "../api/fetchRecommendations";

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

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const questions = [
    {
      text: "What type of TV shows or movies do you enjoy the most?",
      options: ["Drama", "Comedy", "Action", "Fantasy", "Science Fiction"],
    },
    {
      text: "Which type of characters do you prefer?",
      options: [
        "Serious and deep",
        "Funny and quirky",
        "Brave and adventurous",
        "Magical and mystical",
        "Intelligent and innovative",
      ],
    },
    {
      text: "What kind of storyline do you find most intriguing?",
      options: [
        "Emotionally gripping",
        "Light-hearted and humorous",
        "Full of thrilling battles",
        "Involving supernatural elements",
        "Exploring futuristic concepts",
      ],
    },
    {
      text: "Which setting or environment do you prefer in a TV show or movie?",
      options: [
        "Urban cityscape",
        "Rural countryside",
        "Fantasy world",
        "Outer space",
        "Historical era",
      ],
    },
    {
      text: "What is your preferred tone or atmosphere in a TV show or movie?",
      options: [
        "Serious and intense",
        "Light-hearted and fun",
        "Mysterious and suspenseful",
        "Whimsical and magical",
        "Futuristic and innovative",
      ],
    },
  ];

  const handleAnswerSelection = (questionIndex, answer) => {
    const updatedSelectedGenres = [...selectedGenres];
    updatedSelectedGenres[questionIndex] = answer;
    setSelectedGenres(updatedSelectedGenres);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (selectedGenres.length === questions.length) {
      const genreNames = selectedGenres.map((genre) => GENRE_IDS[genre]);
      const uniqueGenres = [...new Set(genreNames)];
      const recommendations = await fetchRecommendations(uniqueGenres);
      // Handle display of recommendations
      console.log(recommendations);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <div className="quizcontainer">
      <h1>Anime Recommendation Quiz</h1>
      <div className="question">
        <p>{questions[currentQuestion].text}</p>
        {questions[currentQuestion].options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question${currentQuestion}`}
              value={option}
              onChange={() => handleAnswerSelection(currentQuestion, option)}
            />
            {option}
          </label>
        ))}
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
