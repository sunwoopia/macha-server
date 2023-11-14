import { Router } from 'express';
import { createUser } from "../services/userService.js";
import {fetchLastTrainTime, getBusInfo} from "../services/dataService.js";

const router = Router();

router.get('/', async (req, res) => {
    const { code, day, direction } = req.body;
    try {
        const response = await fetchLastTrainTime('0342', 1, 1);
        // const response = await fetchLastTrainTime(code, day, direction);
        res.status(201).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Data');
    }
});

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

router.get('/busInfo', async (req, res) => {
    try {
        const response = await getBusInfo('12121');
        res.status(200).json({ success: true });
    } catch (e) {
        console.log(e);
    }
})
router.get('/bus', async (req, res) => { // 버스 막차 시간 계산
    const { arsId, busRouteId } = req.body;

    try {
        const response = await getBustimeByStationList(12173, 100100118);
        res.status(201).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Data');
    }
});



router.post('/near', async (req, res) => { // 가장 근접한 버스 정류장
    const { tmX, tmY, radius } = req.body;
    try {
        const response = await getStaionsByPosList(tmX, tmY, radius);
        res.status(201).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Data');
    }
});


router.post('/time',async (req, res) => {
    const {busRouteId} = req.body;
    try {
        const response = await getArrInfoByRouteAllList(busRouteId);
        res.status(201).json({ response });
    } catch (error) {
        console.error(error) ;
        res.status(500).send('Error Data');
    }
});
export default router;