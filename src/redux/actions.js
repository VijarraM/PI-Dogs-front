import axios from 'axios';

export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const CREATE_BREED = 'CREATE_BREED';
export const GET_BREED = 'GET_BREED';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
export const GET_FILTERED_BREEDS = 'GET_FILTERED_BREEDS';
export const ORDER_BY = 'ORDER_BY';
export const ERROR = 'ERROR';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CLEAR_BREEDS = 'CLEAR_BREEDS';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'; // Nueva acción
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
const API_URL = process.env;
const baseURL = API_URL || 'http://localhost:3001';

export function filterByOrigin(origin, breeds) {
  switch (origin) {
    case 'API':
      origin = breeds.filter((breed) => breed.source === 'API');
      break;

    case 'DB':
      origin = breeds.filter((breed) => breed.source === 'DB');
      break;

    default:
      throw new Error(`Orden no válido: ${origin}`);
  }
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function getAllBreeds() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseURL}/dogs`);
      return dispatch({
        type: GET_ALL_BREEDS,
        payload: res.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_BREEDS,
        payload: error,
      });
    }
  };
}

export function getBreed(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseURL}/dogs/${id}`);
      return dispatch({
        type: GET_BREED,
        payload: res.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_BREED,
        payload: error.response.data,
      });
    }
  };
}

export function getAllTemperaments() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseURL}/temperaments`);
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: res.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: error.response,
      });
    }
  };
}

export function getFilteredBreeds(temperament) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseURL}/dogs`);

      let filteredResp = [];

      if (temperament) {
        res.data.forEach((breed) => {
          if (breed.temperaments) {
            breed.temperaments.forEach((t) => {
              if (t.name === temperament) filteredResp.push(breed);
            });
          }
        });
      } else {
        filteredResp = res.data;
      }

      return dispatch({
        type: GET_FILTERED_BREEDS,
        payload: filteredResp,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_FILTERED_BREEDS,
        payload: error.response,
      });
    }
  };
}

export function orderBy(order, breeds) {
  return function (dispatch) {
    try {
      switch (order) {
        case 'name_asc':
          breeds.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          breeds.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'weight_asc':
          breeds.sort((a, b) => {
            const weightA = a.weight.split(' - ').map(Number);
            const weightB = b.weight.split(' - ').map(Number);
            if (weightA[0] < weightB[0]) return -1;
            if (weightA[0] > weightB[0]) return 1;
            return 0;
          });
          break;
        case 'weight_desc':
          breeds.sort((a, b) => {
            const weightA = a.weight.split(' - ').map(Number);
            const weightB = b.weight.split(' - ').map(Number);
            if (weightA[1] > weightB[1]) return -1;
            if (weightA[1] < weightB[1]) return 1;
            return 0;
          });
          break;

        case 'All':
          break;

        case 'API':
          breeds = breeds.filter((breed) => breed.source === 'API');
          break;

        case 'DB':
          breeds = breeds.filter((breed) => breed.source === 'DB');
          break;

        default:
          throw new Error(`Orden no válido: ${order}`);
      }

      return dispatch({
        type: ORDER_BY,
        payload: breeds,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: ORDER_BY,
        payload: error.response,
      });
    }
  };
}

export function searchByName(name) {
  console.log(name);
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseURL}/dogs?name=${name}`);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: res.data,
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: error.response,
      });
    }
  };
}
