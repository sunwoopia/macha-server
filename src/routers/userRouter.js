import { Router } from 'express';
import { createUser, getUserById, deleteUser, updateUser } from "../services/userService.js";

const router = Router();

router.post('/users', async (req, res) => {
    try {
        const userId = await createUser(req.body);
        res.status(201).json({ userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

router.get('/users/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting user');
    }
});

router.put('/users/:userId', async (req, res) => {
    try {
        await updateUser(req.params.userId, req.body);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

router.delete('/users/:userId', async (req, res) => {
    try {
        await deleteUser(req.params.userId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

