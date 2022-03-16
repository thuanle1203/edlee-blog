import axios from 'axios';

const URL = 'http://localhost:3001';

export const fetchPosts = () => axios.get(`${URL}/blogs`);
export const createPost = (payload) => axios.post(`${URL}/blogs`, payload);
export const updatePost = (payload) =>
  axios.post(`${URL}/blogs/update`, payload);
