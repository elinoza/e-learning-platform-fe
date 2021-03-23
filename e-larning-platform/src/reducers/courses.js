import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };

    default:
      return state;
  }
}
