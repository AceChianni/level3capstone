"use client";

import { useState, useEffect } from "react";

const AnimeSlider = () => {
  const [animeData, setAnimeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch anime data from the Jikan API (Top anime from MyAnimeList)
    const fetchAnimeData = async () => {
      const response = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await response.json();
      setAnimeData(data.data);
    };

    fetchAnimeData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + animeData.length) % animeData.length
    );
  };

  return (
    <div className="anime-slider">
      {animeData.length > 0 ? (
        <>
          <div className="anime-item">
            <img
              src={animeData[currentIndex].images.jpg.large_image_url}
              alt={animeData[currentIndex].title}
            />
            <h3>{animeData[currentIndex].title}</h3>
          </div>

          {/* Custom Navigation */}
          <div className="controls">
            <button className="prev-btn" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="next-btn" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnimeSlider;
