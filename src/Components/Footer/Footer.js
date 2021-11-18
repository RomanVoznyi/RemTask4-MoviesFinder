// import { NavLink } from 'react-router-dom';
import { GiCrownedHeart } from 'react-icons/gi';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/RomanVoznyy"
        target="blank_"
        className={styles.navlink}
      >
        Created with <GiCrownedHeart className={styles.heart} /> by RV
      </a>
      {/* <NavLink
        to="https://github.com/RomanVoznyy"
        exact
        className={styles.navlink}
        activeClassName={styles.activeNavlink}
      ></NavLink> */}
    </footer>
  );
};

export default Footer;
