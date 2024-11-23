// src/components/Sidebar.js
import React from "react";

const Sidebar = () => (
  <aside className="sidebar">
    <h2>Anime History Resources</h2>
    <ul>
      <li>
        <a
          href="https://en.wikipedia.org/wiki/History_of_anime"
          target="_blank"
          rel="noreferrer"
        >
          History of Anime - Wikipedia
        </a>
      </li>
      <li>
        <a
          href="https://www.nippon.com/en/features/h00043/"
          target="_blank"
          rel="noreferrer"
        >
          The Evolution of the Japanese Anime Industry - Nippon
        </a>
      </li>
      <li>
        <a
          href="https://www.britannica.com/art/anime-Japanese-animation"
          target="_blank"
          rel="noreferrer"
        >
          Anime - Britannica
        </a>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
