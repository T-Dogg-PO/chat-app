# Chat-App
## A React Native app for chatting with other people

## Purpose
The purpose of this Chat-App is to experiment with using React Native to build a mobile app. Through this app users will be able to send text messages, images from their device storage and take + send new pictures using their device camera.

## Technologies Used
* React-Native
* Gifted Chat
* Expo
* Firebase/Firestore

## Usage
No live demo of this app exists at this time, so please follow the steps below if you would like to use it yourself!
* Clone the project
```
git clone https://github.com/T-Dogg-PO/chat-app.git
```

* Install dependencies within the project root directory
```
npm install
```

* Set up a Firestore Database at https://firebase.google.com/. Details on how to set up the database can be found in the Firebase documentation - https://firebase.google.com/docs
Note that you will need to replace the firebaseConfig variable in Chat.js with your own database configuration (within Project Settings in Firebase) 

* Run the project using expo start within the project root directory
```
expo start
```

* Download the Expo app on your smartphone and open the chat app by scanning your QR code.