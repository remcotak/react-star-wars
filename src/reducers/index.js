import { combineReducers } from 'redux';
import films from './filmsReducer';
import characters from './charactersReducer';

// Combine reducers
const rootReducer = combineReducers({
  films,
  characters,
});

export default rootReducer;
