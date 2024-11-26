import "/styles/globals.css";
import "/styles/animeSlider.css";
import "/styles/layout.css";
import AnimeSlider from "../components/AnimeSlider";
import Poll from "../components/Poll";
import Sidebar from "../components/Sidebar";

const HomePage = () => (
  <div className="layout">
    <div className="left-sidebar">
      <Sidebar />
    </div>
    <div className="main-content">
      <h1 className="calligraphy">Thee Anniime Finder!</h1>
      <AnimeSlider />
    </div>
    <div className="right-sidebar">
      <Poll />
    </div>
  </div>
);

export default HomePage;
