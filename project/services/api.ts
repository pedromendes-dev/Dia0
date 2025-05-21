import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sua-api.com', // Troque para sua URL real
  timeout: 10000,
});
