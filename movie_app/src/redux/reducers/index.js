import { combineReducers } from "redux";
import MovieReducer from "./MovieReducer"

export default combineReducers({
    movie_data: MovieReducer
});
