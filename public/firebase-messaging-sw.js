
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js");

firebase.initializeApp({
  apiKey: "AIzaSyCGYS03THZx5MXHuQt8xZ2Zm3y-SepPKnQ",
  authDomain: "pwapushtest-ca52a.firebaseapp.com",
  projectId: "pwapushtest-ca52a",
  storageBucket: "pwapushtest-ca52a.appspot.com",
  messagingSenderId: "53262820382",
  appId: "1:53262820382:web:f57d57669635f114b0ba0f"
});

const firestore = firebase.firestore();
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
      body: payload.data?.body,
      icon: payload.data?.image
  };
  console.log(`firebase onBackgroundMessage.`)
  if (payload.data.nid && payload.data.uid) {
    firestore.collection('notifications').doc(payload.data.nid).update({recivepersons: firestore.FieldValue.arrayUnion(payload.data.uid)});
  }
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  if (event.notification.data.nid && event.notification.data.uid) {
    firestore.collection('notifications').doc(event.notification.data.nid).update({openpersons: firestore.FieldValue.arrayUnion(event.notification.data.uid)});
  }
  event.notification.close()
});
