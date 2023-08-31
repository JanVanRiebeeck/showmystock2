import React, { useState } from "react";

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
    <div>
      <div className="gif_header">
        <div className="item1">1</div>
        <div className="item2">2</div>
        <div className="item3">3</div>
      </div>
      <div className="gif_search_item">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <buttonon onClick={searchGifs}>Search GIFs</buttonon>
      </div>
      <div className="gif_preview_items_grid">
        <div>
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
