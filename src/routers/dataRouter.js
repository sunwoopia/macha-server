import { Router } from 'express';
import {fetchLastTrainTime, getBusInfo} from "../services/dataService.js";
import {getAddress, getAddressWithCoordinate} from "../services/naverService.js";

const router = Router();

// 장소 생성 엔드포인트
router.post('/places', async (req, res) => {
    try {
        const { name, address } = req.body;

        // Firestore에 데이터 추가
        const docRef = await firestore.collection('places').add({
            name,
            address
        });

        res.status(201).json({ id: docRef.id, message: 'Place added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/places', async (req, res) => {
    try {
        // Firestore에서 모든 장소 데이터 가져오기
        const placesSnapshot = await firestore.collection('places').get();
        const places = placesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 특정 장소 읽기 엔드포인트
router.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Firestore에서 특정 장소 데이터 가져오기
        const docRef = firestore.collection('places').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            res.status(404).json({ error: 'Place not found' });
        } else {
            res.status(200).json({ id: doc.id, ...doc.data() });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 장소 갱신 엔드포인트
router.put('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;

        // Firestore에서 특정 장소 데이터 갱신
        const docRef = firestore.collection('places').doc(id);
        await docRef.update({ name, address });

        res.status(200).json({ id, message: 'Place updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 장소 삭제 엔드포인트
router.delete('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Firestore에서 특정 장소 데이터 삭제
        const docRef = firestore.collection('places').doc(id);
        await docRef.delete();

        res.status(200).json({ id, message: 'Place deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/naver/address', async (req, res) => {
    const { address } = req.body;
    try {
        const response = await getAddress(address);
        res.status(201).json({ response });
    } catch (e) {
        console.log(e);
    }
})
router.get('/naver/coordinate', async (req, res) => {
    const { x, y } = req.body;
    try {
        const response = await getAddressWithCoordinate(x, y);
        res.status(201).json({ response });
    } catch (e) {
        console.log(e);
    }
})
export default router;