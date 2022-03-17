import { combineReducers } from 'redux';
import blogs from './blogs';
import modal from './modal';

export default combineReducers({
  blogs,
  modal,
});
