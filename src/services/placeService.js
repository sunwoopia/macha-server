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
export const deletePlaceById = async (placeId) => {
    try {
        await placeCollection.doc(placeId).delete();
    } catch (error) {
        console.error("장소 삭제 중 오류 발생:", error);
        throw new Error("장소 삭제 중 오류가 발생했습니다.");
    }
};
