
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

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
      body: payload.data?.body,
      icon: payload.data?.image,
      data: payload.data,
  };
  console.log(`firebase onBackgroundMessage.`);
  if (payload.data.nid && payload.data.uid) {
    await fetch('https://asia-northeast1-pwapushtest-ca52a.cloudfunctions.net/recivenotification', { mode: 'no-cors', method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ nid: payload.data.nid, uid: payload.data.uid, }) });
  }
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', async (event) => {
  console.log('click notify', event);
  if (event.notification.data && event.notification.data.nid && event.notification.data.uid) {
    await fetch('https://asia-northeast1-pwapushtest-ca52a.cloudfunctions.net/opennotification', { mode: 'no-cors', method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ nid: event.notification.data.nid, uid: event.notification.data.uid, }) });
  }
  event.notification.close();
});
