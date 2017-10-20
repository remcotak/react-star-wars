import React from 'react';
import { connect } from 'react-redux';
import { fetchFilmsIfNeeded } from 'actions';

import './Film.sass';

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
    // Set the image source based on the current episode_id
    const image = require(`../../static/img/episode_${this.props.match.params.id}.jpg`);

    return (
      <div>
        { this.state.film.length !== 0 &&
          // If the store has been filled show the content
          <div className="film">
            <img src={image} />
            <div className="film__header">
              <h2>{this.state.film.title}</h2>
              <h3>Episode {this.state.film.episode_id}</h3>
            </div>
            <div className="film__intro">
              <span>{this.state.film.opening_crawl}</span>
            </div>
            <div className="categorie">
              <span className="categorie__title">General Information //</span>
              <p>Release date: {this.state.film.release_date}</p>
              <p>Director: {this.state.film.director}</p>
              <p>Producer: {this.state.film.producer}</p>
            </div>
          </div>
        }
        { this.state.film.length === 0 &&
          // If the API call failed, show this message
          <span>No film available there is, again later you try.</span>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    films: state.films.films.results,
  }),
  { fetchFilmsIfNeeded },
)(Film);
