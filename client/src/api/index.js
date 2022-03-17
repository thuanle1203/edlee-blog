import axios from 'axios';

const URL = 'http://localhost:3001';

export const fetchBlogs = () => axios.get(`${URL}/blogs`);
export const createBlog = (payload) => {
  let formData = new FormData();

  formData.append("file", payload.file);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  return axios.post(`${URL}/blogs/1`, formData);
};
export const updateBlog = (payload) =>
  axios.put(`${URL}/blogs/${payload.id}`, { likes: payload.likes });
