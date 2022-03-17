import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchBlogsSaga(action) {
  try {
    const blogs = yield call(api.fetchBlogs);
    yield put(actions.getBlogs.getBlogsSuccess(blogs.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getBlogs.getBlogsFailure(err));
  }
}

function* createBlogsaga(action) {
  try {
    const blog = yield call(api.createBlog, action.payload);
    yield put((actions.createBlog.createBlogsuccess(blog.data)));
  } catch (err) {
    console.error(err);
    yield put(actions.createBlog.createBlogFailure(err));
  }
}

function* updateBlogsaga(action) {
  try {
    const updatedBlog = yield call(api.updateBlog, action.payload);
    yield put(actions.updateBlog.updateBlogsuccess(updatedBlog.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updateBlog.updateBlogFailure(err));
  }
}

function* mySaga() {
  yield takeLatest(actions.getBlogs.getBlogsRequest, fetchBlogsSaga);
  yield takeLatest(actions.createBlog.createBlogRequest, createBlogsaga);
  yield takeLatest(actions.updateBlog.updateBlogRequest, updateBlogsaga);
}

// generator function ES6

export default mySaga;
