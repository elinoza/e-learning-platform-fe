import { initialState } from "../store";

export default function (state = initialState, action) {
  switch (action.type) {



        case "TOGGLE_GOAL_MODAL":
        return {
          ...state,
          show_goal_Modal:action.payload,
        };
  

    default:
      return state;
  }
}
