import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout, deleteaccount } = useContext(AuthContext);
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text>AccountScreen</Text>
            <Spacer>
                <Button title="Sign Out" onPress={signout} />
            </Spacer>
            <Spacer>
                <Button title="Delete Account" onPress={deleteaccount} />
            </Spacer>
        </SafeAreaView>
    )
};

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <Feather name="settings" size={20} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AccountScreen;