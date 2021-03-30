import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import coursesReducers from "../reducers/courses";
import playerReducers from "../reducers/player";
import meReducers from "../reducers/me";

import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  me: {
    me: {},
    myProgress: []
 
  },

player:{
    currentCourse:{},
    currentCourseProgress:{},
    showSideBar:"true"
  },



  courses: [],
};

const combinedReducer = combineReducers({
//   users: usersReducers,
  me: meReducers,
 courses: coursesReducers,
 player:playerReducers
});

export default function configureStore() {
  return createStore(
    combinedReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
