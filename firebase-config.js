// firebase-config.js
// Replace with YOUR project's config: Firebase Console → Project settings →
// General → "Your apps" → SDK setup and configuration.
// This is safe to keep public — it's not a secret, just an identifier.

const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();
