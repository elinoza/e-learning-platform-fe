import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import coursesReducers from "../reducers/courses";
import playerReducers from "../reducers/player";
import meReducers from "../reducers/me";
import skillsReducers from "../reducers/skills";
import postsReducers from "../reducers/posts";


import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  me: {
    me: {},
    myProgress: [],
    show_goal_Modal:false,
 
  },

player:{
    currentCourse:{},
    currentCourseProgress:{},
    showSideBar:"true"
  },
courses: [],
skills:[],
posts:{
  currentPosts:[],
  currentComments:[]
}
};

const combinedReducer = combineReducers({
//   users: usersReducers,
  me: meReducers,
 courses: coursesReducers,
 player:playerReducers,
 skills:skillsReducers,
 posts:postsReducers
});

export default function configureStore() {
  return createStore(
    combinedReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
