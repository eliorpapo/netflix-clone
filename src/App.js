import './App.css';
import Banner from './cmps/Banner';
import Nav from './cmps/Nav';
import Row from './cmps/Row';
import requests from './requests';

function App() {
  return (
    <div className='app'>
      <Nav />
      <Banner />
      <Row
        isLargeRow={true}
        title='Trending Now'
        fetchUrl={requests.fetchTrending}
      />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documantaries' fetchUrl={requests.fetchDocumantaries} />
    </div>
  );
}

export default App;
