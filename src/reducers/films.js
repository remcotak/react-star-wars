// Import action types
import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_ERROR,
} from '../actions';

// Set the initialstate so the structure of the store is clear
const initialState = {
  isFetching: false,
  hasError: false,
  films: {},
};

// Films reducer
const films = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_FILMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        films: action.films,
      });
    case FETCH_FILMS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true,
      });
    default:
      return state;
  }
};

export default films;
