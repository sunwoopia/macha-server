import {placeCollection} from "../collections/userCollection.js";

export const createPlace = async (placesData) => {
    const newUserRef = await placeCollection.add(placesData);
    return newUserRef.id;
};

export const getPlacesByUserId = async (userId) => {
    const snapshot = await placeCollection.where('userId', '==', userId).get();
    const places = snapshot.docs.map(doc => doc.data());
    return places;
}
