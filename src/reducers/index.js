import { combineReducers } from 'redux';
import films from './films';

// Combine reducers
// For now its just one, will be more in the future
const rootReducer = combineReducers({
  films,
});

export default rootReducer;
