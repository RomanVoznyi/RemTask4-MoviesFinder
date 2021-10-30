import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getCastInfo } from '../../utils/apiservise';
import styles from './Cast.module.css';

const Cast = () => {
  const params = useParams();
  const { url } = useRouteMatch();
  const [error, setError] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const type = url.split('/')[1];

  useEffect(() => {
    console.log(params, url);
    getCastInfo({ movie_id: params.movieId, type })
      .then(res => {
        setMovieInfo(res);
        console.log(res);
      })
      .catch(error => setError(error));
  }, [params.movieId]);
  return (
    <div>
      <ul className={styles.castList}>
        {movieInfo.cast.map(el => {
          return (
            <li key={el.id} className={styles.castItem}>
              <img
                className={styles.photo}
                src={`https://image.tmdb.org/t/p/original${el.profile_path}`}
                alt="poster"
              />
              <h4 className={styles.name}>{el.name}</h4>
              <h5 className={styles.character}>{el.character}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;

// adult: false;
// cast_id: 13;
// character: 'Paul Atreides';
// credit_id: '5b4d01bac3a36823d803cd45';
// gender: 2;
// id: 1190668;
// known_for_department: 'Acting';
// name: 'Timothée Chalamet';
// order: 0;
// original_name: 'Timothée Chalamet';
// popularity: 45.136;
// profile_path: '/8jNFfNmqHVqLHnGnxgu7y8xgRIa.jpg';
