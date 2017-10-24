import React from 'react';

import './FilmDetail.sass';

const FilmDetail = ({
  film, image,
}) => (
  <div>
    { film.length !== 0 &&
      // If the store has been filled show the content.
      <div className="film">
        <img src={image} />
        <div className="film__header">
          <h2>{film.title}</h2>
          <h3>Episode {film.episode_id}</h3>
        </div>
        <div className="film__intro">
          <span>{film.opening_crawl}</span>
        </div>
        <div className="categorie">
          <span className="categorie__title">General Information //</span>
          <p>Release date: {film.release_date}</p>
          <p>Director: {film.director}</p>
          <p>Producer: {film.producer}</p>
        </div>
      </div>
    }
    { film.length === 0 &&
      // If the API call failed, show this message.
      <span>No film available there is, again later you try.</span>
    }
  </div>
);

export default FilmDetail;
