import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class Chat extends React.Component {
    render() {
        // Set up variables for the username and userBackgroundColor (passed in from the Start view)
        let username = this.props.route.params.username;
        let userBackgroundColor = this.props.route.params.userBackgroundColor;

        // Set the title at the top of the App to the passed in username
        this.props.navigation.setOptions({ title: username });
        return (
            <View style={styles.container(userBackgroundColor)}>
                <Text style={styles.title}>Placeholder Chat Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // This formatting allows the colorSelection style to be treated like a function. It is passed in the color that is currently being looped over and allows the color to be set dynamically
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