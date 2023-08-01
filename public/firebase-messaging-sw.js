
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCGYS03THZx5MXHuQt8xZ2Zm3y-SepPKnQ",
  authDomain: "pwapushtest-ca52a.firebaseapp.com",
  projectId: "pwapushtest-ca52a",
  storageBucket: "pwapushtest-ca52a.appspot.com",
  messagingSenderId: "53262820382",
  appId: "1:53262820382:web:f57d57669635f114b0ba0f"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
