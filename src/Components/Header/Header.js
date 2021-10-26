import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </header>
  );
};

export default Header;
