import { NavLink } from 'react-router-dom';
import noImage from './no_image.jpg';
import styles from './MovieSmallCard.module.css';

const MovieSmallCard = ({ el, genres }) => {
  const getYear = str => {
    return str ? ` (${str.slice(0, str.indexOf('-'))})` : '';
  };

  const findId = id => {
    for (const el of genres) {
      if (el.id === id) {
        return el.name;
      }
    }
  };

  const getGenres = genrIds => {
    return genrIds.length > 0
      ? genrIds.map(id => findId(id)).join(', ')
      : 'no data';
  };

  return (
    <NavLink to={`/movies/${el.id}`} className={styles.link}>
      <img
        className={styles.poster}
        src={
          el.poster_path
            ? `https://image.tmdb.org/t/p/original${el.poster_path}`
            : noImage
        }
        alt="poster"
      />
      <div className={styles.descrBlock}>
        <h3 className={styles.title}>
          {el.title || el.name}
          <span className={styles.year}>{getYear(el.release_date)}</span>
        </h3>
        <p className={styles.article}>Genres: {getGenres(el.genre_ids)}</p>
        <p className={styles.article}>{el.overview}</p>
      </div>
    </NavLink>
  );
};

export default MovieSmallCard;
