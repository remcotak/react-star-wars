import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFilmsIfNeeded, sortFilms } from 'actions';

import './Films.sass';

// Sorting the films based on the release_date values.
// Using moment library for easy comparison
const sortByReleaseDate = (a, b) => {
  if (moment(a.release_date).isSame(b.release_date)) {
    return 0;
  }
  return (moment(a.release_date).isBefore(b.release_date)) ? -1 : 1;
};

// Sorting the films based on the episode_id values.
const sortByEpisodeId = (a, b) => {
  if (a.episode_id === b.episode_id) {
    return 0;
  }
  return (a.episode_id < b.episode_id) ? -1 : 1;
};

const handleSort = (films, orderBy) => {
  if (orderBy === 'release_date') {
    return films.sort(sortByReleaseDate);
  }
  return films.sort(sortByEpisodeId);
};

class Films extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
    };
  }
  componentDidMount() {
    // Check if the films are in the store.
    this.props.fetchFilmsIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.films && nextProps.films) {
      this.setState({
        films: handleSort(nextProps.films, nextProps.sortBy),
      });
    }

    if (this.props.sortBy !== nextProps.sortBy) {
      this.setState({
        films: handleSort(nextProps.films, nextProps.sortBy),
      });
    }
  }

  render() {
    const { isFetching, sortBy } = this.props;
    // Fill array with booleans for easier classname declaration
    const sort = {
      releaseDate: sortBy === 'release_date',
      episodeId: sortBy === 'episode_id',
    };

    return (
      <div className="films">
        <div className="films__header">
          <h2>Movies</h2>
          <div className="films__sub">
            <span>
              Sort by:
              <a
                href="#"
                onClick={() => { this.props.sortFilms('release_date'); }}
                className={cn('films__sort', { 'films__sort--active': sort.releaseDate })}
              >
                release date
              </a>
              <a
                href="#"
                onClick={() => { this.props.sortFilms('episode_id'); }}
                className={cn('films__sort', { 'films__sort--active': sort.episodeId })}
              >
                episode number
              </a>
            </span>
            { this.state.films.length !== 0 &&
              <span>Movie posters by<a href="http://abonny.deviantart.com/" target="_blank">Abonny</a></span>
            }
          </div>
        </div>
        { this.state.films.length !== 0 &&
          // If the store has been filled show content
          <div>
            <ul className="films__list">
              {this.state.films.map((film) => {
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
        { !isFetching && this.state.films.length === 0 &&
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
