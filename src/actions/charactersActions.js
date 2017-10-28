import fetch from 'isomorphic-fetch';

// Action types
export const FETCH_CHARACTER_REQUEST = 'FETCH_CHARACTER_REQUEST';
export const FETCH_CHARACTER_SUCCESS = 'FETCH_CHARACTER_SUCCESS';
export const FETCH_CHARACTER_ERROR = 'FETCH_CHARACTER_ERROR';

// Action creators
export const fetchCharacterRequest = () => {
  return { type: FETCH_CHARACTER_REQUEST };
};

export const fetchCharacterSuccess = (character) => {
  return { type: FETCH_CHARACTER_SUCCESS, character };
};

export const fetchCharacterError = (error) => {
  return { type: FETCH_CHARACTER_ERROR, error };
};

// Check the state if the individual character is available
const shouldFetchCharacter = (characterURL, state) => {
  const { characters, isFetching } = state.characters;
  // Find the current character in the characters store
  const currentCharacter = characters.find(character => character.url === characterURL);

  if (!characters) {
    return true;
  } else if (!currentCharacter) {
    return true;
  } else if (isFetching) {
    return false;
  }
  return false;
};

const fetchCharacter = (characterURL) => {
  return (dispatch) => {
    dispatch(fetchCharacterRequest());
    return fetch(characterURL)
      .then(
        response => response.json(),
        error => dispatch(fetchCharacterError(error)),
      )
      .then(json =>
        dispatch(fetchCharacterSuccess(json)));
  };
};

// Check if an API call is needed.
// When the character data is already in the characters store,
// dont dispatch another promise.
export const fetchCharactersIfNeeded = (characters) => {
  return (dispatch, getState) => {
    return characters.map((characterURL) => {
      if (shouldFetchCharacter(characterURL, getState())) {
        return dispatch(fetchCharacter(characterURL));
      }

      return false;
    });
  };
};
