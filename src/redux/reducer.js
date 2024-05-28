import {
  CLEAR_BREEDS,
  CLEAR_DETAILS,
  CLEAR_SEARCH,
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_BREED,
  GET_FILTERED_BREEDS,
  ORDER_BY,
  SEARCH_BY_NAME,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
} from './actions.js';

const initialState = {
  breeds: [],
  breedDetail: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
      };
    case FILTER_BY_ORIGIN:
      const filteredBreedsByOrigin = state.breeds.filter((breed) => {
        return breed.origin.toLowerCase() === action.payload.toLowerCase();
      });
      return {
        ...state,
        filteredByOrigin: filteredBreedsByOrigin,
      };
    case GET_BREED:
      return {
        ...state,
        breedDetail: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        breedDetail: action.payload,
      };
    case CLEAR_BREEDS:
      return {
        ...state,
        breeds: [],
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        foundByName: action.payload,
      };
    case GET_FILTERED_BREEDS:
      return {
        ...state,
        breeds: JSON.parse(JSON.stringify(action.payload)),
      };
    case ORDER_BY:
      return {
        ...state,
        breeds: JSON.parse(JSON.stringify(action.payload)),
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        foundByName: JSON.parse(JSON.stringify(action.payload)),
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        filteredByTemperament: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
