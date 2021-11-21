import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { getReviewsInfo } from '../../utils/apiservise';
import photo from '../../data/photo/no_photo.png';
import styles from './Reviews.module.css';

const Reviews = () => {
  const params = useParams();
  const { url } = useRouteMatch();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const type = url.split('/')[1];

  useEffect(() => {
    getReviewsInfo({ movie_id: params.movieId, type })
      .then(res => {
        setReviews(res.results);
      })
      .catch(error => setError(error.message));
  }, [params, type]);

  const checkUrl = url => {
    return url.toLowerCase().includes('http')
      ? url.slice(url.indexOf('h'))
      : `https://image.tmdb.org/t/p/original${url}`;
  };

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(el => (
            <li key={el.id} className={styles.reviewItem}>
              <img
                src={
                  el.author_details.avatar_path
                    ? checkUrl(el.author_details.avatar_path)
                    : photo
                }
                alt="avatar"
                className={styles.avatar}
              />
              <div className={styles.description}>
                <h4 className={styles.author}>{el.author}</h4>
                <p className={styles.content}>{el.content}</p>
                <p className={styles.data}>{el.created_at}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className={styles.empty}>No reviews available yet</h4>
      )}
      {error && (
        <h4 className={styles.empty}>
          `Woops! Something went wrong - ${error}`
        </h4>
      )}
    </>
  );
};

export default Reviews;
