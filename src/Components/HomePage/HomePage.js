import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getTrendMovies } from '../../utils/apiservise';
import { Pagination } from '@mui/material';
import MovieCard from '../MovieCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();
  const [error, setError] = useState('');

  useEffect(() => {
    getTrendMovies({ page })
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPages(total_pages);
      })
      .catch(error => setError(error.message));
  }, [page]);

  const handleClick = (id, type) => {
    type === 'tv' ? history.push(`/tv/${id}`) : history.push(`/movies/${id}`);
  };

  const handleChange = ({ target }) => {
    setPage(Number(target.textContent));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.pageTitle}>The daily trending list</h2>
      {movies.length > 0 && (
        <>
          <ul className={styles.moviesList}>
            {movies.map(el => (
              <li
                key={el.id}
                className={styles.moviesItem}
                onClick={() => handleClick(el.id, el.media_type)}
              >
                <MovieCard el={el} />
              </li>
            ))}
          </ul>
          <div className={styles.block}>
            <Pagination
              count={totalPages}
              color="secondary"
              page={page}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {error && (
        <h2 className={styles.pageTitle}>
          Woops. Something went wrong - {error}
        </h2>
      )}
    </section>
  );
};

export default HomePage;
