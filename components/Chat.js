import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

// Import Firebase, which will be used to store chat data
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        // Initialize the state with an empty messages array, no uid, and a blank user
        this.state = {
            messages: [],
            uid: 0,
            // loggedInText: 'Please wait, you are being logged in',
            user: {
                _id: '',
                name: '',
            },
        };

        // This is the firebase configuration that will be used to link our App to firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCUFZJcKreTd_zyy_QfGGSeeCufqsuadTE",
            authDomain: "test-9e9e8.firebaseapp.com",
            projectId: "test-9e9e8",
            storageBucket: "test-9e9e8.appspot.com",
            messagingSenderId: "1066509620869",
            appId: "1:1066509620869:web:4690e34bd3d41225683bec",
            measurementId: "G-YTF95HQBF3"
        };
        
        // Initialize the Firestore app with the configuration from above
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        };

        // Reference the collection 'messages' here. Gets all the documents from the messages database
        this.referenceChatMessages = firebase.firestore().collection('messages');

        // Set up the initial user's Messages as null (e.g. until a user logs in)
        this.referenceMessagesUser = null;
      
    }

    componentDidMount() {
        // Set up variable for the username (passed in from the Start view)
        let name = this.props.route.params.name;
        // Set the title at the top of the App to the passed in username
        this.props.navigation.setOptions({ title: name });

        // Use Firebase's anonymous login function to log in a user (at least for now, may change this later to better track users)
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }

            // Update the state with user details
            this.setState({
                uid: user.uid,
                messages: [],
                loggedInText: 'You have successfully logged in!',
                user: {
                    _id: user.uid,
                    name: name
                }
            });

            // This line is to obtain messages specific to the user who logged in. Although this code isn't currently being used, I have kept it in for now in case I want to use this to track a specific users messages
            this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

            // Listen for updates to the referenceChatMessages collection using onSnapshot (and order them by creation date)
            this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        // Call the unsubscribe functions to stop receiving updates about the collection
        this.authUnsubscribe();
        this.unsubscribe();
    }

    // Function to be called by onSnapshot. It will go through the collection and store it in the messages state (so that the messages can be rendered)
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
        this.setState({
            messages,
        })
    }


    // Function for 'sending messages'. Adds a submitted message to the messages state by appending it to the previousState (which references a components state at the time the change is applied)
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
            }),
            // Callback to tge addNessages function, which will add the new message to the database
            () => { this.addMessages(); }
        );
    }

    // Function for saving the message to the database. It takes the first entry in the messages array from the state (which should be the newest message added)
    // Then adds it to the database
    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
        });
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
            <View style={[styles.chatContainer, { backgroundColor: userBackgroundColor }]}>
                <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={this.state.user}
                />
                {/* Conditional to check if the operating system is an android, and to fix the issue where the keyboard will obscure an input field */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1
    },
});