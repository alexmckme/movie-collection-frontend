import React from 'react';
import styles from "./Movie.module.css"
import MovieModal from "../MovieModal/index.js";

function Movie({ id, poster_path, title, release_date, overview, vote_average, vote_count, currentLanguage }) {

    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className={styles.wrapper} onClick={() => {
                setShowModal(true);
            }}>
                <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title}/>
                <h2>{title}</h2>
                <div className={styles.ratings}>
                    <svg width="25px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="#e9b633" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <span><strong>{Math.round(vote_average * 10)}%</strong></span>
                    <span>•</span>
                    <span><strong>{vote_count}</strong> votes</span>
                </div>
                <p>{currentLanguage === "en-US" ? "Released" : "Sortie "}: {release_date}</p>

            </div>
            {showModal && <MovieModal
                id={id}
                poster_path={poster_path}
                title={title}
                release_date={release_date}
                overview={overview}
                vote_average={vote_average}
                vote_count={vote_count}
                currentLanguage={currentLanguage}
                setShowModal={setShowModal}
            />}
        </>
    )
}

export default Movie;
