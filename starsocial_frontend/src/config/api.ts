import axios from 'axios';

export const API_URL_BASE = 'http://localhost:8888';

const jwtToken = localStorage.getItem('jwt');

export const api = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
});
