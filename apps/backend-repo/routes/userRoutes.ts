import { Router } from 'express';
import { updateUserData, fetchUserData, fetchUsersData, deleteUserData } from '../controller/api';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.put('/update-user-data', authMiddleware, updateUserData);
router.get('/fetch-user-data', authMiddleware, fetchUserData);
router.get('/page', fetchUsersData);   // Get multiple users with pagination
router.delete('/:userId', deleteUserData); // Delete user

export default router;