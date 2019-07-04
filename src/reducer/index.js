import { combineReducers } from 'redux';
import { userinfo } from './user.redux';
import { artical } from './artical.redux';
import { comment } from './comment.redux';

export default combineReducers({userinfo, artical, comment});