import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import './FilmsList.sass';

const FilmsList = ({
  isFetching, films, sortFilms, sort, images,
}) => (
  <div className="films">
    <div className="films__header">
      <h2>Movies</h2>
      <div className="films__sub">
        <span>
          Sort by:
          <a
            href="#"
            onClick={() => { sortFilms('release_date'); }}
            className={cn('films__sort', { 'films__sort--active': sort.releaseDate })}
          >
            release date
          </a>
          <a
            href="#"
            onClick={() => { sortFilms('episode_id'); }}
            className={cn('films__sort', { 'films__sort--active': sort.episodeId })}
          >
            episode number
          </a>
        </span>
        { films.length !== 0 &&
          <span>Movie posters by<a href="http://abonny.deviantart.com/" target="_blank">Abonny</a></span>
        }
      </div>
    </div>
    { films.length !== 0 &&
      // If the store has been filled show content.
      <div>
        <ul className="films__list">
          {films.map((film) => {
            return (
              <Link
                key={film.episode_id}
                to={`/film/${film.episode_id}`}
                className="films__item"
              >
                <li>
                  <img src={images[film.episode_id]} />
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    }
    { !isFetching && films.length === 0 &&
      // If the API call failed, show this message.
      <span>No films available there were, again later you try.</span>
    }
  </div>
);

export default FilmsList;
