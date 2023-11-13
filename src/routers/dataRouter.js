import { Router } from 'express';
import { createUser } from "../services/userService.js";
import { fetchLastTrainTime, getBustimeByStationList } from "../services/dataService.js";

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