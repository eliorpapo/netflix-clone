import React, { useState, useEffect } from 'react';
import requests from '../requests';
import { axiosService } from '../service';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../styles/banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const movies = await axiosService.setMoviesService(
        requests.fetchTrending
      );
      var movie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(movie);
    }
    fetchData();
  }, []);

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

  const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + '…' : source;
  };

  if (!movie.overview) return <div> loading</div>;

  const movieStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(
          'http://image.tmdb.org/t/p/original/${movie.backdrop_path}'
        )`,
    backgroundPosition: 'center center',
  };

  return (
    <div>
      <header style={movieStyle} className='banner'>
        <div className='banner-container'>
          <h1 className='banner-title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner-btns'>
            <button onClick={() => handleClick(movie)} className='banner-btn'>
              Play
            </button>
            <button className='banner-btn'>My List</button>
          </div>
          <h1 className='banner-description'>
            {truncate(movie.overview, 400)}
          </h1>
        </div>
        <div className='banner-fade-bottom'></div>
      </header>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Banner;
