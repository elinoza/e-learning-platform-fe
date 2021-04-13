import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_SKILLS":
      return {
        ...state,
        skills: action.payload,
      };

      


     

    default:
      return state;
  }
}
