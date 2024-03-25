/* eslint-disable */
// Scripts for firebase and firebase messagings
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAG3977Tuc-xmpVzr7wG62xG7qXVm8Rz4c",
    authDomain: "push-notifcations-ab1e6.firebaseapp.com",
    projectId: "push-notifcations-ab1e6",
    storageBucket: "push-notifcations-ab1e6.appspot.com",
    messagingSenderId: "404893427609",
    appId: "1:404893427609:web:048fddb05c8a2d96fc1508",
    measurementId: "G-P2SHV7F967"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
