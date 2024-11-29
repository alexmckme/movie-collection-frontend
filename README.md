
# Movie Collection Frontend

This project is an interface that allows users to get information about the current top popular movies according to TheMovieDB. Its main features are as follows:

- List of popular movies in a grid format, in descending order.
- Pagination: users can get more results by visiting the next result pages.
- Ability to switch language to show French images versions, movies titles and descriptions.
- Clicking on a movie card opens a modal (with accessibility in mind) that shows more information about it, including two selected user submitted reviews: one positive, one critical.
- Fully mobile-responsive.


## How it is made

The frontend was created using the React library, bootstrapped with Vite. CSS modules were used for styling almost every component by hand.

The data comes from the "Movie Collection Backend" project, which is an API that has to be run at the same time for the whole project to work.


## How to run locally

- Prerequisite: run the "Movie Collection Backend" project locally.
- Clone this repo ("Movie Collection Frontend") into your work folder.
- Run ***npm run dev***
- Happy browsing! 🍿