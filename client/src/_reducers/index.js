import { combineReducers } from "redux";

import errorReducer from "./_errorReducer";
import authReducer from "./_authReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
});
