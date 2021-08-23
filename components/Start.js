import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

// Set up the backgroundColours that will be used to create the colour selection buttons
const backgroundColors = ['#FFFFFF', '#E0FFFF', '#FFF0F5', '#708090']

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        // Set the initial state to no username and a white background
        this.state = {
            username: '',
            userBackgroundColor: '#FFFFFF'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Get the ImageBackground from the provided assets */}
                <ImageBackground source={require("../assets/Background-Image.png")} resizeMode="cover" style={styles.backgroundImage} >
                    <Text style={styles.title}>Chat App</Text>
                    {/* The inputContainer View will house all the input sections with its own styling */}
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.nameInput} placeholder='Your Name' onChangeText={(username) => this.setState({username})} />
                        <View>
                            <Text style={styles.colorSelectionHeading}>Choose Background Colour:</Text>
                            <View style={styles.colorSelectionItems}>
                                {/* Loop through the backgroundColors array and create a TouchableOpacity component for each one. TouchableOpacity is a component that makes it easy to respond to user toches (may swap out for Pressable at a later date) */}
                                {backgroundColors.map(color => (
                                    <TouchableOpacity key={color} style={styles.colorSelection(color)} onPress={() => this.setState({ userBackgroundColor: color })} />
                                ))}
                            </View>
                        </View>
                        {/* When the Start Chatting button is pressed, navigate to the Chat screen passing in the username and userBackgroundColor as props */}
                        <Button style={styles.chatButton} title="Start Chatting" onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, userBackgroundColor: this.state.userBackgroundColor })} />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        flexDirection: "column"
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 0.5
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        height: '44%',
        width: '88%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    nameInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        width: '88%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    chatButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#757083'
    },
    colorSelectionHeading: {
        fontSize: 16,
        marginBottom: 5
    },
    colorSelectionItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    // This formatting allows the colorSelection style to be treated like a function. It is passed in the color that is currently being looped over and allows the color to be set dynamically
    colorSelection: (color) => ({
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: color
    })
});