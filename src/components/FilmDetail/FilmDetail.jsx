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
          <div className="film__info">
            <span><b>Release date:</b> {film.release_date}</span>
            <span><b>Director:</b> {film.director}</span>
            <span><b>Producer:</b> {film.producer}</span>
          </div>
        </div>
        <div className="categorie">
          <span className="categorie__title">Characters //</span>
            <ul>
              { film.characters.map((character, index) => {
                return (
                  <li key={index}>
                    {character}
                  </li>
                );
              })}
            </ul>
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
