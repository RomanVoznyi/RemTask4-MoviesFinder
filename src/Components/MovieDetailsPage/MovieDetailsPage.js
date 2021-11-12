import React, { Suspense, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { getMovieInfo } from '../../utils/apiservise';
import styles from './MovieDetailsPage.module.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Cast = React.lazy(() => import('../Cast'));
const Reviews = React.lazy(() => import('../Reviews'));

const MovieDetailsPage = () => {
  const params = useParams();
  const { url } = useRouteMatch();
  const [error, setError] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const type = url.split('/')[1];

  useEffect(() => {
    getMovieInfo({ movie_id: params.movieId, type })
      .then(res => setMovieInfo(res))
      .catch(error => setError(error));
  }, [params, type]);

  return (
    <>
      {movieInfo && (
        <div className={styles.movieCard}>
          <h2 className={styles.title}>{movieInfo.title || movieInfo.name}</h2>
          <div className={styles.movieBox}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
              alt="poster"
            />
            <div className={styles.descriprion}>
              <span>Original title:</span>
              <span className={styles.special}>
                {movieInfo.original_title || movieInfo.original_name}
              </span>
              <span>Genres:</span>
              <span className={styles.article}>
                {movieInfo.genres.map(el => el.name).join(', ')}
              </span>
              <span>Date of release:</span>
              <span className={styles.article}>
                {movieInfo.release_date || movieInfo.first_air_date}
              </span>
              {type === 'tv' && (
                <>
                  <span>Seasons / Episodes: </span>
                  <span className={styles.article}>
                    {movieInfo.number_of_seasons}/{movieInfo.number_of_episodes}
                  </span>
                </>
              )}
              <span>{type === 'tv' ? 'Episod runtime:' : 'Runtime:'}</span>
              <span className={styles.article}>
                {type === 'tv'
                  ? movieInfo.episode_run_time[0]
                  : movieInfo.runtime}{' '}
                minutes
              </span>
              <span>Raiting:</span>
              <span className={styles.special}>{movieInfo.vote_average}</span>
              <span>Total votes:</span>
              <span className={styles.article}>{movieInfo.vote_count}</span>
              <span>Overview:</span>
              <span className={styles.article}>{movieInfo.overview}</span>
            </div>
          </div>
          <div className={styles.addInfo}>
            <NavLink
              to={`${url}/cast`}
              className={styles.navlink}
              activeClassName={styles.activeNavlink}
            >
              Cast
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={styles.navlink}
              activeClassName={styles.activeNavlink}
            >
              Reviews
            </NavLink>
          </div>
        </div>
      )}
      <div className="addDetails">
        <Suspense
          fallback={
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          }
        >
          <Switch>
            <Route path="/movies/:movieId/cast" exact>
              <Cast />
            </Route>
            <Route path="/tv/:movieId/cast" exact>
              <Cast />
            </Route>
            <Route path="/movies/:movieId/reviews" exact>
              <Reviews />
            </Route>
            <Route path="/tv/:movieId/reviews" exact>
              <Reviews />
            </Route>
          </Switch>
        </Suspense>
      </div>
      {error && (
        <h2 className={styles.pageTitle}>
          Woops. Something went wrong - {error}
        </h2>
      )}
    </>
  );
};

export default MovieDetailsPage;
