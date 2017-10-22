import fetch from 'isomorphic-fetch';

// Action types
export const FETCH_FILMS_REQUEST = 'FETCH_FILMS_REQUEST';
export const FETCH_FILMS_SUCCESS = 'FETCH_FILMS_SUCCESS';
export const FETCH_FILMS_ERROR = 'FETCH_FILMS_ERROR';
export const ORDER_FILMS = 'ORDER_FILMS';

// Action creators
export const fetchFilmsRequest = () => {
  return { type: FETCH_FILMS_REQUEST };
};

export const fetchFilmsSuccess = (films) => {
  return { type: FETCH_FILMS_SUCCESS, films };
};

export const fetchFilmsError = (error) => {
  return { type: FETCH_FILMS_ERROR, error };
};

export const orderFilms = (orderBy) => {
  return { type: ORDER_FILMS, orderBy };
};

// Check the state if the films are available
const shouldFetchFilms = (state) => {
  const { films, isFetching } = state.films;

  if (!films.results) {
    return true;
  } else if (isFetching) {
    return false;
  }
  return false;
};

const fetchFilms = () => {
  // Pass the dispatch method as an argument to the function,
  // so its able to dispatch actions itself.
  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(fetchFilmsRequest());

    // Return a promise to wait for.
    return fetch('https://swapi.co/api/films/?format=json')
      .then(
        response => response.json(),
        error => dispatch(fetchFilmsError(error)),
      )
      .then(json =>
        // Update the app's state with the results of the API call.
        dispatch(fetchFilmsSuccess(json)));
  };
};

// Check if an API call is needed
// When the films data is already in the store,
// dont dispatch another promise
export const fetchFilmsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchFilms(getState())) {
      return dispatch(fetchFilms());
    }
    return false;
  };
};
