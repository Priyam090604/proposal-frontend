import axios from 'axios';

const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const api = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchSiteConfig = () => api.get('/config');
export const saveResponse = d => api.post('/proposal-response', d);
export const postComment = d => api.post('/comment', d);

export default api;