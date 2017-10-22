import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFilmsIfNeeded, orderFilms } from 'actions';

import './Films.sass';

class Films extends React.Component {
  componentDidMount() {
    // Check if the films are in the store.
    this.props.fetchFilmsIfNeeded();
  }

  orderFilms(orderBy) {
    console.log(orderBy);
    this.props.orderFilms(orderBy);
  }

  render() {
    const { isFetching } = this.props;
    const films = this.props.films || [];

    return (
      <div className="films">
        <div className="films__header">
          <h2>Movies</h2>
          { films.length !== 0 &&
            <span>Movie posters by <a href="http://abonny.deviantart.com/" target="_blank">Abonny</a></span>
          }
          <span className="films__order">Order by:
            <a onClick={() => { this.orderFilms('release_date'); }}>Release date</a> |
            <a onClick={() => { this.orderFilms('episode_id'); }} className="inactive">Episode number</a>
          </span>
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
    films: state.films.films.results,
  }),
  { fetchFilmsIfNeeded, orderFilms },
)(Films);
