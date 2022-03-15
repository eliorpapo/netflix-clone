import React, { useState, useEffect } from 'react';
import '../styles/row.css';
import { axiosService } from '../service';

const baseURL = 'http://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await axiosService.setMoviesService(fetchUrl);
      setMovies(results);
      return results;
    }
    fetchData();
  }, [fetchUrl]);

  if (!movies) return <div> loading</div>;

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row-posters'>
        {movies.map((movie) => {
          return (
            <img
              className={`row-poster ${isLargeRow && `row-poster-large`}`}
              key={movie.id}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
