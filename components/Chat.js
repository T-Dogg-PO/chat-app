import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class Chat extends React.Component {
    render() {
        let username = this.props.route.params.username;
        let userBackgroundColor = this.props.route.params.userBackgroundColor;
        this.props.navigation.setOptions({ title: username });
        return (
            <View style={styles.container(userBackgroundColor)}>
                <Text style={styles.title}>Placeholder Chat Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: (userBackgroundColor) => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: userBackgroundColor
    }),
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        flex: 0.5
    },
});