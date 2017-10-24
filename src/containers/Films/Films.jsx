import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchFilmsIfNeeded, sortFilms } from 'actions';
import { FilmsList } from 'components';
import ImageEpisode1 from 'img/episode_1.jpg';
import ImageEpisode2 from 'img/episode_2.jpg';
import ImageEpisode3 from 'img/episode_3.jpg';
import ImageEpisode4 from 'img/episode_4.jpg';
import ImageEpisode5 from 'img/episode_5.jpg';
import ImageEpisode6 from 'img/episode_6.jpg';
import ImageEpisode7 from 'img/episode_7.jpg';

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
      <FilmsList
        isFetching={isFetching}
        films={this.state.films}
        sortFilms={this.props.sortFilms}
        sort={sort}
        images={images}
      />
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
