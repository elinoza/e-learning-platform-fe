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
          myProgress: action.payload,
        };

        case "TOGGLE_GOAL_MODAL":
        return {
          ...state,
          show_goal_Modal:action.payload,
        };







  

    default:
      return state;
  }
}
