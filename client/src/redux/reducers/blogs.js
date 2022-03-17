import { INIT_STATE } from '../../constant';
import { getBlogs, getType, createBlog, updateBlog } from '../actions';

export default function blogsReducers(state = INIT_STATE.blogs, action) {
  switch (action.type) {
    case getType(getBlogs.getBlogsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getBlogs.getBlogsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getBlogs.getBlogsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createBlog.createBlogsuccess):
      {
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      }
    case getType(updateBlog.updateBlogsuccess):
      return {
        ...state,
        data: state.data.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
        ),
      };
    default:
      return state;
  }
}
