import React, { useState, useEffect } from 'react';
import '../styles/row.css';
import { axiosService } from '../service';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const baseURL = 'http://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const results = await axiosService.setMoviesService(fetchUrl);
      setMovies(results);
      return results;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || movie.title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get(`v`));
        })
        .catch((err) => console.log(err));
    }
  };

  const opts = {
    height: '390px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const getResponsive = (num) => {
    var res = {
      2: {
        breakpoint: { max: 400, min: 0 },
        items: 2,
      },
    };
    for (let i = 3; i < num; i++) {
      res[i] = { breakpoint: { max: i * 200, min: (i - 1) * 200 }, items: i };
    }
    return res;
  };

  const responsive = getResponsive(100);

  if (!movies) return <div> loading</div>;

  return (
    <div className='row'>
      <h2>{title}</h2>
      <Carousel responsive={responsive}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              onClick={() => handleClick(movie)}
              className={`row-poster ${isLargeRow && `row-poster-large`}`}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </div>
        ))}
      </Carousel>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
