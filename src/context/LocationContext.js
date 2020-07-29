import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
    switch(action.type) {
        case 'recording_start':
            return {...state, isRecording: true};
        case 'recording_stop':
            return {...state, isRecording: false};
        case 'addlocation_recording':
            return {...state, locations: [...state.locations, action.payload]};
        case 'addlocation_current':
            return {...state, currentLocation: action.payload };
        case 'name_change':
            return {...state, trackname: action.payload};
        case 'reset':
            return {...state, trackname: '', locations: []};
        default:
            return state;
    }
};

const changeName = dispatch => (name) => {
    dispatch({ type: 'name_change', payload: name});
};

const startRecording = dispatch => () => {
    dispatch({ type: 'recording_start' });
};

const stopRecording = dispatch => () => {
    dispatch({ type: 'recording_stop' });
};

const addLocation = dispatch => (location, isRecording) => {
    dispatch({type: 'addlocation_current', payload: location});
    if (isRecording) {
        dispatch({ type: 'addlocation_recording', payload: location });
    }
};

const reset = dispatch => () => {
    dispatch({ type: 'reset' });
}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    { isRecording: false, locations: [], currentLocation: null, trackname: ''}
)