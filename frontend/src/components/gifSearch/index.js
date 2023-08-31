import "./style.css";
import React, { useState } from "react";
import exitIcon from "../../../src/styles/icons/icons8-exit-48.png";

export default function GifSearch() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);

  const API_KEY = "8tD3377E9GSDeLGXb6vv0zFwYUYmrLuS";
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=`;

  const searchGifs = async () => {
    try {
      const response = await fetch(API_URL + query);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="gif_container">
      <div className="gif_header">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchGifs}>Search GIFs</button>
        <img src={exitIcon} alt="" />
      </div>
      <div className="gif_grid">
        <div className="">
          {gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
