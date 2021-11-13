import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getSearchList } from '../../utils/apiservise';
import { Pagination } from '@mui/material';
import styles from './SearchList.module.css';

const SearchList = () => {
  const [request, setRequest] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    request &&
      getSearchList({ query: request, page }).then(data => {
        setMoviesList(data.results);
      });
  }, [page]);

  const handleInput = ({ target }) => {
    setRequest(target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setPage(1);
    if (request) {
      getSearchList({ query: request, page: 1 }).then(data => {
        setTotalPages(data.total_pages);
        setMoviesList(data.results);
      });
    } else {
      console.log('Type something');
      setTotalPages(0);
      setMoviesList([]);
    }
  };

  const handlePages = ({ target }) => {
    setPage(Number(target.textContent));
  };

  return (
    <section>
      <h2 className={styles.title}>Hello list movies page</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.searchbar}>
          <input type="text" value={request} onChange={handleInput} />
        </label>
        <button type="submit" className={styles.searchbar}>
          ClickMe
        </button>
      </form>
      {moviesList.length !== 0 && (
        <>
          <ul>
            {moviesList.map(el => (
              <li key={el.id}>
                <NavLink to={`/movies/${el.id}`}>{el.title || el.name}</NavLink>
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
    </section>
  );
};

export default SearchList;

// page: 1
// results: [{…}]
// total_pages: 1
// total_results: 1
// [[Prototype]]: Object

// adult: false
// backdrop_path: "/2va32apQP97gvUxaMnL5wYt4CRB.jpg"
// genre_ids: (2) [14, 28]
// id: 268
// original_language: "en"
// original_title: "Batman"
// overview: "Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham's criminal underworld."
// popularity: 42.593
// poster_path: "/r7XF6duZy5ZXmOX7HE3fKGV1WLN.jpg"
// release_date: "1989-06-23"
// title: "Batman"
// video: false
// vote_average: 7.2
// vote_count: 5844
// [[Prototype]]: Object
