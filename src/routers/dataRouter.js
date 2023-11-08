import { Router } from 'express';
import {createUser} from "../services/userService.js";
import {fetchLastTrainTime} from "../services/dataService.js";

const router = Router();

router.get('/', async (req, res) => {
    // const { code, day, direction } = req.body;
    try {
        const response = await fetchLastTrainTime('0342',1,1);
        // const response = await fetchLastTrainTime(code,day,direction);
        res.status(201).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Data');
    }
});

export default router;