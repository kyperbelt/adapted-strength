import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { ApiUtils } from './api/ApiUtils';

var firebaseConfig = {
  apiKey: "AIzaSyAG3977Tuc-xmpVzr7wG62xG7qXVm8Rz4c",
  authDomain: "push-notifcations-ab1e6.firebaseapp.com",
  projectId: "push-notifcations-ab1e6",
  storageBucket: "push-notifcations-ab1e6.appspot.com",
  messagingSenderId: "404893427609",
  appId: "1:404893427609:web:048fddb05c8a2d96fc1508",
  measurementId: "G-P2SHV7F967"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BHTVCP1P6sX7OcJFYLG3Y1rSO6LeD367aIGtR8pZt9F2IGkDm3mPisCwUyyL7n5dqlWliG6bqA-Qm_6d6JYc9po' }).then((currentToken) => {
    if (currentToken) {

      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      ApiUtils.apiPost('notifications/add_token', {token: currentToken});
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });