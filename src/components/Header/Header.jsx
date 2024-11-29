import React from 'react';
import styles from "./Header.module.css"

function Header({ currentLanguage, setCurrentLanguage }) {



  React.useEffect(() => {
    if (!localStorage.getItem("movieCollectionChosenLanguage")) {
      localStorage.setItem("movieCollectionChosenLanguage", currentLanguage);
    }
  }, [])

  return (
      <div className={styles.header}>
        <img src="/movie-collection-logo.svg" alt="Movie Collection logo" />
        {currentLanguage==="en-US" && <img src="/gb-flag.png" alt="English flag" onClick={() => setCurrentLanguage("fr-FR")} />}
        {currentLanguage==="fr-FR" && <img src="/fr-flag.png" alt="French flag" onClick={() => setCurrentLanguage("en-US")} />}
      </div>);
}

export default Header;
