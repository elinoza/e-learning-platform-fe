import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import coursesReducers from "../reducers/courses";
// import Reducers from "../reducers/users";
import meReducers from "../reducers/me";

import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  me: {
    me: {},
    myProgress: []
 
  },

//   users: {
//     users: [],
//     single_user: {},
//     single_user_id: "",
//   },

  courses: [],
};

const combinedReducer = combineReducers({
//   users: usersReducers,
  me: meReducers,
 courses: coursesReducers,
});

export default function configureStore() {
  return createStore(
    combinedReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
