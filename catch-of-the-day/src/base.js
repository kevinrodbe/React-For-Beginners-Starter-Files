import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
	apiKey: 'AIzaSyC1tDLEtMDzQgtStx_xj7kOYG265F7uge4',
  authDomain: 'catch-of-the-day-krb.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-krb.firebaseio.com'
});

const base = Rebase.createClass(app.database());

export default base;
