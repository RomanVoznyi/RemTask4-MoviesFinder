import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getCastInfo } from '../../utils/apiservise';
import photo from '../../data/photo/no_photo.png';
import styles from './Cast.module.css';

const Cast = () => {
  const params = useParams();
  const { url } = useRouteMatch();
  const [error, setError] = useState('');
  const [castInfo, setCastInfo] = useState([]);
  const type = url.split('/')[1];

  useEffect(() => {
    getCastInfo({ movie_id: params.movieId, type })
      .then(res => {
        setCastInfo(res.cast);
      })
      .catch(error => setError(error));
  }, [params, type]);

  return (
    <div>
      {castInfo.length > 0 ? (
        <ul className={styles.castList}>
          {castInfo.map(el => {
            return (
              <li key={el.id} className={styles.castItem}>
                <img
                  className={styles.photo}
                  src={
                    el.profile_path
                      ? `https://image.tmdb.org/t/p/original${el.profile_path}`
                      : photo
                  }
                  alt="poster"
                />
                <h4 className={styles.name}>{el.name}</h4>
                <h5 className={styles.character}>{el.character}</h5>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4 className={styles.empty}>No cast available yet</h4>
      )}
      {error && (
        <h4 className={styles.error}>
          `Woops! Something went wrong - ${error}`
        </h4>
      )}
    </div>
  );
};

export default Cast;
