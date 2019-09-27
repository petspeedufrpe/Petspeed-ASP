import axios from 'axios';

const api = axios.create({
  baseURL: 'http://petspeed.herokuapp.com/',
});

export default api;
