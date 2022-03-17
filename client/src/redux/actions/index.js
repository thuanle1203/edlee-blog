import { createActions, createAction } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getBlogs = createActions({
  getBlogsRequest: undefined,
  getBlogsSuccess: (payload) => payload,
  getBlogsFailure: (err) => err,
});

export const createBlog = createActions({
  createBlogRequest: (payload) => payload,
  createBlogsuccess: (payload) => payload,
  createBlogFailure: (err) => err,
});

export const updateBlog = createActions({
  updateBlogRequest: (payload) => payload,
  updateBlogsuccess: (payload) => payload,
  updateBlogFailure: (err) => err,
});

export const showModal = createAction('SHOW_CREATE_Blog_MODAL');
export const hideModal = createAction('HIDE_CREATE_Blog_MODAL');

/*
  getType(getBlogs.getBlogsuccess)
  =>  
  {
    type: 'getBlogsuccess',
    payload: {
      name: 'Test'
    }
  }
*/
