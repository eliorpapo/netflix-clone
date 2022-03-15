import axios from 'axios';

async function setMoviesService(fetchUrl) {
  if (localStorage.getItem(`movies${fetchUrl}`))
    return JSON.parse(localStorage.getItem(`movies${fetchUrl}`));
  const req = await axios.get(fetchUrl);
  localStorage.setItem(`movies${fetchUrl}`, JSON.stringify(req.data.results));
  return req.data.results;
}

export const axiosService = {
  setMoviesService,
};
