import createDataContext from './createDataContext';
import trackerApi from '../apis/track-server';
// import {   } from "../context/AuthContext";

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'tracks_fetch':
            return action.payload;
        default:
            return state;
    }
};

const fetchTracks = dispatch => async () => {
    const response = await trackerApi.get('/tracks');
    dispatch({type: 'tracks_fetch', payload: response.data })
};

const saveTrack = dispatch => async (trackname, locations) => {
    const response = await trackerApi.post('/tracks', { name: trackname, locations });
    console.log(response.data);
};

const viewTrack = dispatch => () => {

};

export const { Context, Provider } = createDataContext(
    trackReducer,
    { saveTrack, fetchTracks, viewTrack },
    []
)