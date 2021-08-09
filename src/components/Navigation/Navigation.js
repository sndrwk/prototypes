import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Link to="/pocket-marquee" className={styles.link}>
        pocket marquee
      </Link>
      <Link to="/book-of-changes" className={styles.link}>
        book of changes
      </Link>
    </div>
  );
};

export default Navigation;
