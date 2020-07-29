import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillFocus={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign in to your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <NavLink 
                routeName="Signup"
                navLinkText="Don't have an account? Sign up instead!"
            />
        </View>
    );
};

SigninScreen.navigationOptions = {
    header: null
}

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

export default SigninScreen;