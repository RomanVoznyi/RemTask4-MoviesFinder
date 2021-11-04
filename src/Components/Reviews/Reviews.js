import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { getReviewsInfo } from '../../utils/apiservise';
import photo from '../Cast/NoPhoto.png';
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

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(el => (
            <li key={el.id} className={styles.reviewItem}>
              <img
                src={
                  el.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/original${el.author_details.avatar_path}`
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
    </div>
  );
};

export default Reviews;

// author: "Obito Uchiha"
// author_details: {name: 'Obito Uchiha', username: 'oppai69', avatar_path: null, rating: null}
// content: "Just totally worth it."
// created_at: "2021-09-22T09:30:42.406Z"
// id: "614af7c2d2c0c10028ec881c"
// updated_at: "2021-09-30T16:22:11.970Z"
// url: "https://www.themoviedb.org/review/614af7c2d2c0c10028ec881c"
