var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
