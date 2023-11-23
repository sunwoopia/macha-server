import { Router } from 'express';
import {getAddress, getAddressWithCoordinate} from "../services/naverService.js";
import { createPlace, getPlacesByUserId } from "../services/placeService.js";

const router = Router();

// 장소 생성 엔드포인트
router.post('/places', async (req, res) => {
    try {
        const response = await createPlace(req.body);
        res.status(201).json({ id: response, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/places/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const places = await getPlacesByUserId(userId);
        res.status(200).json({ place: places });
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

router.post('/naver/address', async (req, res) => {
    const { address } = req.body;
    console.log(address);
    try {
        const response = await getAddress(address);
        console.log(response);
        res.status(201).json({ "x": response.x, "y": response.y });
    } catch (e) {
        console.log(e);
    }
})
router.get('/naver/coordinate', async (req, res) => {
    const { x, y } = req.query;
    try {
        const response = await getAddressWithCoordinate(x, y);
        res.status(201).json({ address: response });
    } catch (e) {
        console.log(e);
        res.status(201).json({ address: "잘못된 좌표입니다. 다시 클릭하여주세요."});
    }
})
export default router;