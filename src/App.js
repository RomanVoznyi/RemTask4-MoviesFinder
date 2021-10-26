import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

const HomePage = React.lazy(() => import('./Components/HomePage'));
const Header = React.lazy(() => import('./Components/Header'));
const MoviesPage = React.lazy(() => import('./Components/MoviesPage'));
const MovieDetailsPage = React.lazy(() =>
  import('./Components/MovieDetailsPage'),
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
