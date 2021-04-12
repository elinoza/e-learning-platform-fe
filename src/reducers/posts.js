import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
   
      case "SET_CURRENT_POSTS":
        return {
          ...state,
          currentPosts: action.payload,
        };

      case "SET_CURRENT_COMMENTS":
        return {
          ...state,
          currentComments: action.payload,
        };
     
  

    default:
      return state;
  }
}
