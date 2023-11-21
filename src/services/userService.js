import { usersCollection } from "../collections/userCollection.js";
export const createUser = async (userData) => {
    const newUserRef = await usersCollection.add(userData);
    return newUserRef.id;
};

export const getUserById = async (userId) => {
    const userDoc = await usersCollection.doc(userId).get();
    if (userDoc.exists) {
        return { id: userDoc.id, ...userDoc.data() };
    } else {
        return null;
    }
};

export const updateUser = async (userId, updatedData) => {
    await usersCollection.doc(userId).update(updatedData);
};

export const deleteUser = async (userId) => {
    await usersCollection.doc(userId).delete();
};

export const loginUser = async (email, password) => {
    try {
        let userUid;
        const data = [];
        const snapshot = await usersCollection.where('email', '==', email).get();
        snapshot.forEach((doc) => {
            data.push(doc.data());
            userUid = doc.exists ? doc.id : null;
        });
        return userUid;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};