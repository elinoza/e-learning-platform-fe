import { initialState } from "../store";

export default function (state = initialState, action) {
  switch (action.type) {

        case "SET_ME":
      return {
        ...state,
        me: action.payload,
      };
      case "SET_MY_PROGRESS":
        return {
          ...state,
          my_Progress: action.payload,
        };


    // case "LIKE_COMMENT":
    //   return {
    //     ...state,
    //     likedComments: state.liked.concat(action.payload),
    //   };
    // case "REMOVE_LIKE_FROM_COMMENT":
    //   return {
    //     ...state,
    //     likedComments: state.liked.filter(
    //       (album) => album.id !== action.payload
    //     ),
    //   };
    // case "ADD_TO_SAVED":
    //   return {
    //     ...state,
    //     savedPosts: state.savedPosts.concat(action.payload),
    //   };
    // case "REMOVE_FROM_SAVED":
    //   return {
    //     ...state,
    //     savedPosts: state.savedPosts.filter(
    //       (post) => post._id !== action.payload._id
    //     ),
    //   };




  

    default:
      return state;
  }
}
