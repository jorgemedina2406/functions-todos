const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

// Create notification when creating a list
exports.createNotifications = functions.firestore
    .document('/users/{userid}/todos/{todo}')
    .onCreate( (snap:any, context:any) => {

    const user = context.params.userid;
    const docRef = db.collection(`/users/${user}/notifications`).doc();

    const setAda = docRef.set({
        notification: 'Se creo la lista',
        list: snap.data().title,
        read: false,
        created: admin.firestore.FieldValue.serverTimestamp()
    });

    return setAda;

  });

// Create notification when deleting a list
exports.deleteNotifications = functions.firestore
    .document('/users/{userid}/todos/{todo}')
    .onDelete( (snap:any, context:any) => {

    const user = context.params.userid;
    const docRef = db.collection(`/users/${user}/notifications`).doc();

    const setAda = docRef.set({
        notification: 'Se elimino la lista',
        list: snap.data().title,
        read: false,
        created: admin.firestore.FieldValue.serverTimestamp()
    });

    return setAda;

  });

// Create notification when updating a list
exports.updateNotifications = functions.firestore
    .document('/users/{userid}/todos/{todo}')
    .onUpdate( (snap:any, context:any) => {

    const user = context.params.userid;
    const docRef = db.collection(`/users/${user}/notifications`).doc();

    const setAda = docRef.set({
        notification: 'Se actualizo la lista',
        list: snap.data().title,
        read: false,
        created: admin.firestore.FieldValue.serverTimestamp()
    });

    return setAda;

  });
