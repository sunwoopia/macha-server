import { Router } from 'express';
import { createUser, getUserById, deleteUser, updateUser, loginUser } from "../services/userService.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const userId = await createUser(req.body);
        res.status(201).json({ success: true, token: userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if (user) {
            res.status(201).json({ success: true, data: user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting user');
    }
});

router.put('/:userId', async (req, res) => {
    try {
        await updateUser(req.params.userId, req.body);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        await deleteUser(req.params.userId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = await loginUser(email, password);
        if (userId) {
            res.status(200).json({ success: true, token: userId });
        } else {
            res.status(401).json({success: false, message: 'login failed'})
        }
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid credentials'); // 로그인 실패 시 401 Unauthorized 반환
    }
});

export default router;