// src/app/page.js
import "/styles/animeSlider.css";
import "/styles/globals.css";
import AnimeSlider from "../components/AnimeSlider";

const HomePage = () => (
  <div className="home-page">
    <h1>Annii's Anime Finder!</h1>
    <AnimeSlider />
  </div>
);

export default HomePage;
