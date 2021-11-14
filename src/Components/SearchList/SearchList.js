import { useState, useEffect } from 'react';

import { getSearchList, getGenres } from '../../utils/apiservise';
import MovieSmallCard from '../MovieSmallCard';
import { Pagination } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import styles from './SearchList.module.css';

const SearchList = () => {
  const [request, setRequest] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    request &&
      getSearchList({ query: request, page })
        .then(data => {
          setMoviesList(data.results);
        })
        .catch(error => setError(error.message));
  }, [page]);

  const handleInput = ({ target }) => {
    setRequest(target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setPage(1);
    if (request) {
      if (error) {
        setError('');
      }
      getSearchList({ query: request, page: 1 })
        .then(data => {
          setTotalPages(data.total_pages);
          setMoviesList(data.results);
        })
        .catch(error => setError(error.message));
      getGenres()
        .then(data => {
          setGenres(data.genres);
        })
        .catch(error => setError(error.message));
    } else {
      console.log('Type something');
      setTotalPages(0);
      setMoviesList([]);
    }
  };

  const handlePages = ({ target }) => {
    setPage(Number(target.textContent));
  };

  const clear = () => {
    setRequest('');
    if (error) {
      setError('');
    }
  };

  return (
    <section>
      <h2 className={styles.pageTitle}>Movies finder page</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.searchbar}>
          <input
            type="text"
            value={request}
            onChange={handleInput}
            className={styles.searchInput}
            placeholder="Please, input you request"
          />
          <button type="submit" className={styles.findButton}>
            <BsSearch />
          </button>
          {request && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={clear}
            >
              <CgClose />
            </button>
          )}
        </label>
      </form>
      {moviesList.length !== 0 && !error && (
        <>
          <ul className={styles.moviesList}>
            {moviesList.map(el => (
              <li key={el.id} className={styles.moviesItem}>
                <MovieSmallCard el={el} genres={genres} />
              </li>
            ))}
          </ul>
          <div className={styles.block}>
            <Pagination
              count={totalPages}
              color="secondary"
              page={page}
              onChange={handlePages}
            />
          </div>
        </>
      )}
      {error && (
        <h2 className={styles.error}>Woops. Something went wrong - {error}</h2>
      )}
    </section>
  );
};

export default SearchList;
