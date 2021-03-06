import React from 'react';
import { connect } from 'react-redux';
import { fetchFilmsIfNeeded } from 'actions';
import { FilmDetail } from 'components';
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

// Get the current film(episode) from the films object.
const getFilm = (id, films) => {
  const episodeId = parseInt(id, 10);
  return films.filter(film => film.episode_id === episodeId)[0];
};

class Film extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      film: [],
    };
  }

  componentDidMount() {
    // Check if the films are in the store.
    this.props.fetchFilmsIfNeeded();

    if (this.props.films) {
      // Put the current film in the state.
      this.setState({
        film: getFilm(this.props.match.params.id, this.props.films),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update state whenever a prop has changed.
    this.setState({
      film: getFilm(nextProps.match.params.id, nextProps.films),
    });
  }

  render() {
    return (
      <FilmDetail
        film={this.state.film}
        image={images[this.props.match.params.id]}
      />
    );
  }
}

export default connect(
  state => ({
    films: state.films.films.results,
  }),
  { fetchFilmsIfNeeded },
)(Film);
