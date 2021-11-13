import axios from 'axios';
const API_KEY = '6914e86918040074e2fe382ba8e8cb5e';
const BASE_URL = 'https://api.themoviedb.org/3';

const getTrendMovies = async ({ page }) => {
  const data = await axios.get(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`,
  );
  return data.data;
};

const getSearchList = async ({ query, page }) => {
  console.log(query, page);
  const data = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
  return data.data;
};

const getMovieInfo = async ({ movie_id, type }) => {
  const data = await axios.get(
    `${BASE_URL}${
      type === 'tv' ? '/tv' : '/movie'
    }/${movie_id}?api_key=${API_KEY}&language=en-US`,
  );
  return data.data;
};
const getCastInfo = async ({ movie_id, type }) => {
  const data = await axios.get(
    `${BASE_URL}${
      type === 'tv' ? '/tv' : '/movie'
    }/${movie_id}/credits?api_key=${API_KEY}&language=en-US`,
  );
  return data.data;
};
const getReviewsInfo = async ({ movie_id, type, page = 1 }) => {
  const data = await axios.get(
    `${BASE_URL}${
      type === 'tv' ? '/tv' : '/movie'
    }/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
  );
  return data.data;
};

export {
  getTrendMovies,
  getSearchList,
  getMovieInfo,
  getCastInfo,
  getReviewsInfo,
};
