import {
    API_ERROR,
    API_LOADING,
    MOVIE_DATA

} from "./actiontypes";
import { create } from 'apisauce'

const api = create({
    baseURL: 'https://www.omdbapi.com',
})


const apiLoading = () => ({
    type: API_LOADING
});

export const getSucessData = data => ({
    type: MOVIE_DATA,
    payload: { data }
});
export const getFailure = error => ({
    type: API_ERROR,
    payload: { error }
});

export const getMovieData = (term) => {
    return async dispatch => {
        dispatch(apiLoading());
        try {
            const res = await api.get(`/?type=movie&apikey=a1b5f9ec&s=${term}`);
            if (res.data.Response === "True") {
                return dispatch(getSucessData(res.data.Search));

            }

            return dispatch(getSucessData([]));

        } catch (err) {
            return dispatch(getFailure(err.message));
        }

    };
}



