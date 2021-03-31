import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_COURSE_PROGRESS":
      return {
        ...state,
        currentCourseProgress: action.payload,
      };
      case "SET_CURRENT_COURSE":
        return {
          ...state,
          currentCourse: action.payload,
        };
        case "SHOWSIDEBAR":
        return {
          ...state,
          showSideBar: action.payload,
        };
  

    default:
      return state;
  }
}
