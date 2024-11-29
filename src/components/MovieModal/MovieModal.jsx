import React from 'react';
import styles from "./MovieModal.module.css"
import useSWR from "swr";
import parse from "html-react-parser"
import FocusLock from "react-focus-lock";
import {RemoveScroll} from 'react-remove-scroll';
import LoadingSpinner from "../LoadingSpinner/index.js";

async function fetcher(endpoint) {
    const response = await fetch(endpoint);
    const json = await response.json();

    if (json.status !== "OK") {
        throw json
    }

    return json
}

function getConstrastingReviews(reviewsArr) {

    const ratingsArr = reviewsArr.map((review) => {
        return (review.author_details.rating)
    })

    const nonNullRatingsArr = ratingsArr.filter((rating) => rating !== null)
    const maxRating = Math.max(...nonNullRatingsArr)

    const firstMaxRatingReview = reviewsArr.find((review) => review.author_details.rating === maxRating)
    const minRating = Math.min(...nonNullRatingsArr)

    const firstMinRatingReview = reviewsArr.find((review) => review.author_details.rating === minRating)

    return {firstMaxRatingReview, firstMinRatingReview}
}


function MovieModal({ id, poster_path, title, release_date, overview, vote_average, vote_count, currentLanguage, setShowModal }) {

    React.useEffect(() => {
        function handleKeyDown(event) {
            if (event.code === "Escape") {
                handleDismiss()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleDismiss])

    const ENDPOINT = `http://localhost:3000/api/v1/movies/${id}/reviews`

    const {data, isLoading, error} = useSWR(ENDPOINT, fetcher)

    if (isLoading) {
        return (
            <LoadingSpinner/>
        )
    }

    if (error) {
        return (
            <p>Something's gone wrong</p>
        )
    }

    const {firstMaxRatingReview, firstMinRatingReview} = getConstrastingReviews(data.data.results)

    function handleDismiss() {
        setShowModal(false)
    }

    return (
        <FocusLock>
            <RemoveScroll>
                <div className={styles.bg} onClick={handleDismiss}></div>
                <div className={styles.wrapper}>
                    <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title}/>
                    <button
                        className={styles.closeBtn}
                        onClick={handleDismiss}
                    >×
                    </button>
                    <div>
                        <div className={styles.overview}>
                            <h1>{title}</h1>
                            <p>{currentLanguage === "en-US" ? "Release date: " : "Date de sortie : "}{release_date}</p>
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
                            <h3>{currentLanguage === "en-US" ? "Overview" : "Résumé"}</h3>
                            <p>{overview}</p>
                        </div>
                        {firstMaxRatingReview && <div className={styles.reviewContainerPositive}>
                            <h3>{currentLanguage === "en-US" ? "Most positive review by " : "Avis le plus positif écrit par "}{firstMaxRatingReview.author_details.username}</h3>
                            <p>Date: {firstMaxRatingReview.created_at.substring(0, 10)}</p>
                            <h4>{currentLanguage === "en-US" ? "Rating: " : "Note : "}{
                                <strong>{Math.round(firstMaxRatingReview.author_details.rating * 10)}%</strong>}</h4>
                            <p>"{parse(firstMaxRatingReview.content)}"</p>
                        </div>}
                        {firstMinRatingReview && firstMinRatingReview!==firstMaxRatingReview && <div className={styles.reviewContainerNegative}>
                            <h3>{currentLanguage === "en-US" ? "Most critical review by " : "Avis le plus critique écrit par "}{firstMinRatingReview.author_details.username}</h3>
                            <p>Date: {firstMinRatingReview.created_at.substring(0, 10)}</p>
                            <h4>{currentLanguage === "en-US" ? "Rating: " : "Note : "}{
                                <strong>{Math.round(firstMinRatingReview.author_details.rating * 10)}%</strong>}</h4>
                            <p>"{parse(firstMinRatingReview.content)}"</p>
                        </div>}
                    </div>

                </div>
            </RemoveScroll>
        </FocusLock>
    );
}

export default MovieModal;
