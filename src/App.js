import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import './App.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HomePage = lazy(() =>
  import('./Components/HomePage' /* webpackChunkName: "home-page" */),
);
const SearchList = lazy(() =>
  import('./Components/SearchList' /* webpackChunkName: "search-list" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Components/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <Loader
            type="Puff"
            color="#FFFFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <SearchList />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/tv/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
