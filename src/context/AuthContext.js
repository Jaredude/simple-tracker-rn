import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../apis/track-server';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin_error':
            return { ...state, errorMessage: action.payload }
        case 'signin_success':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { ...state, token: null, errorMessage: '' };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin_success' });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
}

const signup = dispatch => async ({ email, password }) => {
    // make api request to signup with email and password
    try {
        const response = await trackerApi.post('/signup', { email, password });
        // if we receive jwt, modify our state that we are authenticated
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin_success', payload: response.data.token });
        // navigate to main flow
        navigate('TrackList');
    } catch (err) {
        // if signup fails, reflect an error message to user
        dispatch({ type: 'signin_error', payload: 'Something went wrong with the signup' });
    }
};

const signin = dispatch => async ({ email, password }) => {
    // make api request ti signin with email and password
    try {
        const response = await trackerApi.post('/signin', { email, password });
        // if we receive jwt, modify our state that we are authenticated
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin_success', payload: response.data.token });
        // navigate to main flow
        navigate('TrackList');
    } catch (err) {
        // if signin fails, reflect an error message to user
        dispatch({ type: 'signin_error', payload: 'Somthing went wrong with sign in' });
    }
};

const signout = dispatch => async () => {
    // clear token to logout
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
}

const deleteaccount = dispatch => {
    return (email, password) => {
        // make api request to delete login
        // if we receive 200, modify our state that we are deleted and return user to signup page

        // if delete fails, reflect an error message to user
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, deleteaccount, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)