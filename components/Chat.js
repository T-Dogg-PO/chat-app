import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor() {
        super();
        // Initialize the state with an empty messages array
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        // Set up variable for the username (passed in from the Start view)
        let username = this.props.route.params.username;
        // Set the title at the top of the App to the passed in username
        this.props.navigation.setOptions({ title: username });

        // Set up the initial state with some static starting messages (a system message welcoming the user, and a starting message from the other person)
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `Welcome to the chat ${username}!`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    // Function for 'sending messages'. Adds a submitted message to the messages state by appending it to the previousState (which references a components state at the time the change is applied)
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    // renderBubble is a function used to change the style of the chat bubbles (in this case, the background colour to black)
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    render() {
        // Set up variable for the userBackgroundColor (passed in from the Start view)
        let userBackgroundColor = this.props.route.params.userBackgroundColor;

        return (
            <View style={[styles.chatContainer, styles.container(userBackgroundColor)]}>
                <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{ _id: 1, }}
                />
                {/* Conditional to check if the operating system is an android, and to fix the issue where the keyboard will obscure an input field */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // This formatting allows the colorSelection style to be treated like a function. It is passed in the color that is currently being looped over and allows the color to be set dynamically
    container: (userBackgroundColor) => ({
        backgroundColor: userBackgroundColor
    }),
    chatContainer: {
        flex: 1
    },
});