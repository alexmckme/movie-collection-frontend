import useSWR from "swr"
import styles from "./App.module.css"
import Movie from "./components/Movie/index.js";
import Header from "./components/Header/index.js";
import React from "react";
import Pagination from "./components/Pagination/index.js";
import LoadingSpinner from "./components/LoadingSpinner/index.js";

// If running the backend locally, change the port accordingly
const PORT = 3000;

async function fetcher(endpoint) {
    const response = await fetch(endpoint);
    const json = await response.json();

    if (json.status !== "OK") {
        throw json
    }

    return json
}

function App() {

    const [currentLanguage, setCurrentLanguage] = React.useState("en-US");
    const [currentPopularMoviesPage, setCurrentPopularMoviesPage] = React.useState(1);


    const ENDPOINT = `http://localhost:${PORT}/api/v1/movies/popular?language=${currentLanguage}&page=${currentPopularMoviesPage}`

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

    const allMoviesElements = (data.data.results).map(movie => {

        return (
            <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                overview={movie.overview}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                currentLanguage={currentLanguage}
            />
        )
    })

    return (
        <>
            <style>{"body {background-color: #fff7fb}"}</style>
            <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>
            <section className={styles.mainContainer}>
                {!isLoading && (
                    <div>
                        {allMoviesElements}
                    </div>
                )}
            </section>
            <Pagination currentPopularMoviesPage={currentPopularMoviesPage} setCurrentPopularMoviesPage={setCurrentPopularMoviesPage} maxPages={data.data.total_pages} />
        </>
    )
}

export default App
