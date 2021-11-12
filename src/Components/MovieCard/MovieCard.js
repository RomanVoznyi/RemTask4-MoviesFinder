import noImage from './no_image.jpg';
import styles from './MovieCard.module.css';

const MovieCard = ({ el }) => {
  return (
    <>
      <img
        className={styles.poster}
        src={
          el.poster_path
            ? `https://image.tmdb.org/t/p/original${el.poster_path}`
            : noImage
        }
        alt="poster"
      />
      <h3 className={styles.title}>{el.title || el.name}</h3>
      <p className={styles.vote}>
        raiting:{' '}
        <span className={styles.voteDigit}>{el.vote_average || 0}</span>
      </p>
    </>
  );
};

export default MovieCard;
