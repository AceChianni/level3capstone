// // src/app/page.js
// import React from "react";
// import "/styles/animeSlider.css";
// import "/styles/globals.css";
// import AnimeSlider from "../components/AnimeSlider";
// import Poll from "../components/Poll";

// const HomePage = () => (
//   <div className="home-page">
//     <h1>Annii's Anime Finder!</h1>
//     <div className="content-container">
//       <div className="slider-section">
//         <AnimeSlider />
//       </div>
//       <div className="poll-section">
//         <Poll />
//       </div>
//     </div>
//   </div>
// );

// export default HomePage;

// src/app/page.js
import "/styles/globals.css";
import "/styles/animeSlider.css";
import "/styles/layout.css"; // New file for layout-specific styles
import AnimeSlider from "../components/AnimeSlider";
import Poll from "../components/Poll";

const HomePage = () => (
  <div className="layout">
    <div className="left-sidebar">
      <h2>Links</h2>
      <ul>
        <li>
          <a href="#link1">Link 1</a>
        </li>
        <li>
          <a href="#link2">Link 2</a>
        </li>
        <li>
          <a href="#link3">Link 3</a>
        </li>
      </ul>
    </div>
    <div className="main-content">
      <AnimeSlider />
    </div>
    <div className="right-sidebar">
      <Poll />
    </div>
  </div>
);

export default HomePage;
