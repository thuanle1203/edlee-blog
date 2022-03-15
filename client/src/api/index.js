import axios from 'axios';

const URL = 'http://localhost:3000'

export const fetchPosts = () => axios.get(`${URL}/posts`);