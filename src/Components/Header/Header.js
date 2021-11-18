import { useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti';
import styles from './Header.module.css';

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = ({ target }) => {
    const name =
      target.localName === 'button' ? target.name : target.parentElement.name;
    name === 'back' ? history.goBack() : history.goForward();
  };

  return (
    <header className={styles.header}>
      <NavLink
        to={{
          pathname: '/',
          state: { from: location },
        }}
        exact
        className={styles.navlink}
        activeClassName={styles.activeNavlink}
      >
        Home
      </NavLink>
      <NavLink
        to={{
          pathname: '/movies',
          state: { from: location },
        }}
        exact
        className={styles.navlink}
        activeClassName={styles.activeNavlink}
      >
        Movies
      </NavLink>
      <div className={styles.buttonBox}>
        <button
          type="button"
          onClick={handleClick}
          className={styles.button}
          name="back"
        >
          <TiArrowBackOutline />
          <span className={styles.btnTextBack}>Go back</span>
        </button>
        <button
          type="button"
          onClick={handleClick}
          className={styles.button}
          name="forward"
        >
          <span className={styles.btnTextForw}>Go forward</span>

          <TiArrowForwardOutline />
        </button>
      </div>
    </header>
  );
};

export default Header;
