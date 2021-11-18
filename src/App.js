import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { addBackToTop } from 'vanilla-back-to-top';
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
  addBackToTop({
    diameter: 56,
    innerHTML:
      '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    backgroundColor: '#1e2761',
    textColor: '#fff',
  });

  return (
    <div className="App">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
