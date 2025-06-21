import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SosScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>SOS Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SosScreen;