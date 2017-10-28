// Import action types
import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
} from '../actions';

// Set the initialstate so the structure of the store is clear
const initialState = {
  isFetching: false,
  hasError: false,
  characters: [],
};

// Characters reducer
const characters = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        characters: [...state.characters, action.character],
      });
    case FETCH_CHARACTER_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true,
      });
    default:
      return state;
  }
};

export default characters;
