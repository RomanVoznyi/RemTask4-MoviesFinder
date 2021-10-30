import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        exact
        className={styles.navlink}
        activeClassName={styles.activeNavlink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        exact
        className={styles.navlink}
        activeClassName={styles.activeNavlink}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
