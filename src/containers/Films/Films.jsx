import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFilmsIfNeeded, sortFilms } from 'actions';
import ImageEpisode1 from '../../static/img/episode_1.jpg';
import ImageEpisode2 from '../../static/img/episode_2.jpg';
import ImageEpisode3 from '../../static/img/episode_3.jpg';
import ImageEpisode4 from '../../static/img/episode_4.jpg';
import ImageEpisode5 from '../../static/img/episode_5.jpg';
import ImageEpisode6 from '../../static/img/episode_6.jpg';
import ImageEpisode7 from '../../static/img/episode_7.jpg';

import './Films.sass';

// Keep a reference to the images in an array to dynamically load the correct image.
const images = {
  1: ImageEpisode1,
  2: ImageEpisode2,
  3: ImageEpisode3,
  4: ImageEpisode4,
  5: ImageEpisode5,
  6: ImageEpisode6,
  7: ImageEpisode7,
};

// Sorting the films based on the release_date values.
// Using moment library for easy comparison.
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

    // If the films are already fetched, handle the sorting.
    if (this.props.films) {
      this.setState({
        films: handleSort(this.props.films, this.props.sortBy),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // When the films are fetched, handle the sorting.
    if (!this.props.films && nextProps.films) {
      this.setState({
        films: handleSort(nextProps.films, nextProps.sortBy),
      });
    }

    // When a changed sortBy prop is received, handle the sorting.
    if (this.props.sortBy !== nextProps.sortBy) {
      this.setState({
        films: handleSort(nextProps.films, nextProps.sortBy),
      });
    }
  }

  render() {
    const { isFetching, sortBy } = this.props;
    // Fill array with booleans for easier classname declaration.
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
          // If the store has been filled show content.
          <div>
            <ul className="films__list">
              {this.state.films.map((film) => {
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
        { !isFetching && this.state.films.length === 0 &&
          // If the API call failed, show this message.
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
