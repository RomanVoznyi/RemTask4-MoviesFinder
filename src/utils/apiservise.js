import axios from 'axios';
const API_KEY = '6914e86918040074e2fe382ba8e8cb5e';
const BASE_URL = 'https://api.themoviedb.org/3';

const getTrendMovies = () => {
  return axios
    .get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`)
    .then(data => {
      return data.data;
    });
};

const getSearchList = ({ query, page }) => {
  return axios
    .get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    )
    .then(data => data.data);
};

const getMovieInfo = ({ movie_id, type }) => {
  return axios
    .get(
      `${BASE_URL}${
        type === 'tv' ? '/tv' : '/movie'
      }/${movie_id}?api_key=${API_KEY}&language=en-US`,
    )
    .then(data => data.data);
};
const getCastInfo = ({ movie_id, type }) => {
  return axios
    .get(
      `${BASE_URL}${
        type === 'tv' ? '/tv' : '/movie'
      }/${movie_id}/credits?api_key=${API_KEY}&language=en-US`,
    )
    .then(data => data.data);
};
const getReviewsInfo = ({ movie_id, type, page = 1 }) => {
  return axios
    .get(
      `${BASE_URL}${
        type === 'tv' ? '/tv' : '/movie'
      }/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
    .then(data => data.data);
};

export {
  getTrendMovies,
  getSearchList,
  getMovieInfo,
  getCastInfo,
  getReviewsInfo,
};
