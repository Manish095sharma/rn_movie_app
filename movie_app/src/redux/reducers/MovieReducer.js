import { API_LOADING, API_ERROR, MOVIE_DATA } from "../actions/actiontypes"

const initialState = {
    movieData: [],
    loading: false,
    error: null
};

export default function MovieReducer(state = initialState, action) {
    switch (action.type) {
        case API_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case MOVIE_DATA:
            return {
                ...state,
                loading: false,
                error: null,
                movieData: action.payload.data
            };

        case API_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                movieData: []
            };

        default:
            return state;
    }
}
