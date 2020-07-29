import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={signup}
            />
            <NavLink 
                routeName="Signin"
                navLinkText='Already have an account? Sign in instead!'
            />
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: null
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: '10%'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10,
        marginTop: 10
    }
});

export default SignupScreen;