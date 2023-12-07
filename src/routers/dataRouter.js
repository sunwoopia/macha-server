import { Router } from 'express';
import axios from "axios";
import {getAddress, getAddressWithCoordinate} from "../services/naverService.js";
import {createPlace, deletePlaceById, getPlacesByUserId} from "../services/placeService.js";

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
        await deletePlaceById(id);
        res.status(200).json({ success: true, message: 'Place deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/naver/address', async (req, res) => {
    const { address } = req.body;
    try {
        const response = await getAddress(address);
        res.status(201).json({ "x": response.x, "y": response.y });
    } catch (e) {
        res.status(500).json({ success: false });
    }
})
router.get('/naver/coordinate', async (req, res) => {
    const { x, y } = req.query;
    try {
        const response = await getAddressWithCoordinate(x, y);
        res.status(201).json({ address: response });
    } catch (e) {
        res.status(201).json({ address: "잘못된 좌표입니다. 다시 클릭하여주세요."});
    }
})

router.get('/makcha', async (req, res) => {
    const { startX, startY, endX, endY, time } = req.query;
    try {
        const requestData = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            count: 1,
            lang: 0,
            format: "json",
            searchDttm: time, //ex. 202311232300
        };
        const config = {
            headers: {
                'accept': 'application/json',
                'appKey': 'yVelZ5wcsC69m82s0or5Q68Yg4Lfknu57ZN8amog',
                'content-type': 'application/json'
            }
        };
        const response = await axios.post('https://apis.openapi.sk.com/transit/routes', requestData, config);
        const itineraries = response.data.metaData && response.data.metaData.plan && response.data.metaData.plan.itineraries ;
        const bus_array = [] ;
        const subway_array = [] ;   

        //막차가 아니고 운행중이면 배열에 원소를 넣음 
        if (itineraries) {
            for (const itinerary of itineraries) {
                if (itinerary.legs) {
                    for (const leg of itinerary.legs) {
                        // 버스 막차 확인 
                        if (leg.service === 1 ) {
                            bus_array.push(1);
                        } else if (leg.servie === 0) {
                            continue;
                        }
                        
                        if (leg.service === "undefined") { 
                            // 지하철 막차 확인 
                            for (const Lane of itinerary.legs){
                                if (Lane.servie === 1){
                                    subway_array.push(1);
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (bus_array.length > 0 || subway_array.length > 0) {
            res.status(201).json(response.data);
        } else {
            res.status(400).json({message : "막차가 없습니다."})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

        


export default router;
