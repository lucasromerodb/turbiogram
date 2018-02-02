import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyDEsXg0ezESAyWhD35lM6rFVB1FVraUsnI",
  authDomain: "pseudogram-1a6d1.firebaseapp.com",
  databaseURL: "https://pseudogram-1a6d1.firebaseio.com",
  projectId: "pseudogram-1a6d1",
  storageBucket: "pseudogram-1a6d1.appspot.com",
  messagingSenderId: "1035691257365"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
