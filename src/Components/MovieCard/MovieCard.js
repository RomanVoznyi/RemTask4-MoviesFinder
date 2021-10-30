import styles from './MovieCard.module.css';

const MovieCard = ({ el }) => {
  return (
    <>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
        alt="poster"
      />
      <h3 className={styles.title}>{el.title || el.name}</h3>
      <p className={styles.vote}>
        raiting: <span className={styles.voteDigit}>{el.vote_average}</span>
      </p>
    </>
  );
};

export default MovieCard;
