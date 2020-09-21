import axios from 'axios';

const client = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000/',
  withCredentials: true,
});

export default client;
