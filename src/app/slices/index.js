import { combineReducers } from "redux";
import todo from "./todoSlice";
import busy from "./busySlice";

export default combineReducers({
    todo,
    busy,
});
