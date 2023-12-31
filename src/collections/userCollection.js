import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.mjs';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-qtuo5@macha-26b76.iam.gserviceaccount.com',
});

const db = admin.firestore();

export const usersCollection = db.collection('users');
export const placeCollection = db.collection('places')
