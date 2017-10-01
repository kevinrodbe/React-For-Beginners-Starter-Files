import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'YOUR_KEY',
  authDomain: 'catch-of-the-day-krb.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-krb.firebaseio.com'
});

const base = Rebase.createClass(app.database());

export default base;
