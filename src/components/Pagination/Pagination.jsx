import React from 'react';
import styles from "./Pagination.module.css"

function Pagination({ currentPopularMoviesPage, setCurrentPopularMoviesPage, maxPages }) {

  return (
      <div className={styles.wrapper}>
        <button
            onClick={() => {
              if (currentPopularMoviesPage - 1 >= 1) {
                setCurrentPopularMoviesPage(currentPopularMoviesPage - 1);
            }}}
        >⯇</button>
        <span>Page: {currentPopularMoviesPage}</span>
        <button
            onClick={() => {
              if (currentPopularMoviesPage + 1 <= maxPages) {
                setCurrentPopularMoviesPage(currentPopularMoviesPage + 1);
              }}}
        >⯈</button>
      </div>
  );
}

export default Pagination;
