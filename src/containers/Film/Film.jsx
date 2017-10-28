import React from 'react';
import { connect } from 'react-redux';
import { fetchFilmsIfNeeded, fetchCharactersIfNeeded } from 'actions';
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
  return films.find(film => film.episode_id === episodeId);
};

class Film extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // Check if the films are in the store.
    this.props.fetchFilmsIfNeeded();

    if (this.props.films) {
      // Put the current film in the state.
      this.setState({
        film: getFilm(this.props.match.params.id, this.props.films),
      }, () => {
        this.props.fetchCharactersIfNeeded(this.state.film.characters);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update the state when the current episode id has changed
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        film: getFilm(nextProps.match.params.id, nextProps.films),
      });
    }

    // Set the currect film in the state when the films are fetched
    // After the state has been set check for the characters
    if (this.props.films.count !== nextProps.films.count) {
      this.setState({
        film: getFilm(nextProps.match.params.id, nextProps.films),
      }, () => {
        this.props.fetchCharactersIfNeeded(this.state.film.characters);
      });
    }
  }

  render() {
    return (
      <FilmDetail
        film={this.state.film}
        image={images[this.props.match.params.id]}
      >
        { this.state.film && this.props.characters &&
          <div className="categorie">
            <span className="categorie__title">Characters //</span>
              <ul>
                { this.state.film.characters.map((characterURL) => {
                  const character = this.props.characters.find(storeCharacter =>
                    storeCharacter.url === characterURL);
                  if (character) {
                    return (
                      <li key={character.url}>
                        {character.name}
                      </li>
                    );
                  }

                  return false;
                })}
              </ul>
          </div>
        }
      </FilmDetail>
    );
  }
}

export default connect(
  state => ({
    films: state.films.films.results,
    characters: state.characters.characters,
  }),
  { fetchFilmsIfNeeded, fetchCharactersIfNeeded },
)(Film);
