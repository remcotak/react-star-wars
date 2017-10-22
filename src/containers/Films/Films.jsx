import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { fetchFilmsIfNeeded, sortFilms } from 'actions';

import './Films.sass';

class Films extends React.Component {
  componentDidMount() {
    // Check if the films are in the store.
    this.props.fetchFilmsIfNeeded();
  }

  sortFilms(sortBy) {
    console.log(sortBy);
    this.props.sortFilms(sortBy);
  }

  render() {
    const { isFetching } = this.props;
    // Fill array with booleans for easier classname declaration
    const sort = {
      releaseDate: this.props.sortBy === 'release_date',
      episodeId: this.props.sortBy === 'episode_id',
    };
    const films = this.props.films || [];

    return (
      <div className="films">
        <div className="films__header">
          <h2>Movies</h2>
          <div className="films__sub">
            <span>
              Sort by:
              <a
                href="#"
                onClick={() => { this.sortFilms('release_date'); }}
                className={cn('films__sort', { 'films__sort--active': sort.releaseDate })}
              >
                release date
              </a>
              <a
                href="#"
                onClick={() => { this.sortFilms('episode_id'); }}
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
          // If the store has been filled show content
          <div>
            <ul className="films__list">
              {films.map((film) => {
                // This part needs some more attention,
                // need to find a way to import the images dynamically without require.
                const image = require(`../../static/img/episode_${film.episode_id}.jpg`);

                return (
                  <Link
                    key={film.episode_id}
                    to={`/film/${film.episode_id}`}
                    className="films__item"
                  >
                    <li>
                      <img src={image} />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        }
        { !isFetching && films.length === 0 &&
          // If the API call failed, show this message
          <span>No films available there were, again later you try.</span>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isFetching: state.films.isFetching,
    sortBy: state.films.sortBy,
    films: state.films.films.results,
  }),
  { fetchFilmsIfNeeded, sortFilms },
)(Films);
