import { Request, Response } from 'express';
import { updateUser, fetchUser } from '@/repository/userCollection';

export const updateUserData = async (req: Request, res: Response) => {
  const { userId, userData } = req.body;
  try {
    await updateUser(userId, userData);
    res.status(200).send('User data updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user data: ' + error.message);
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await fetchUser(userId as string);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching user data: ' + error.message);
  }
};
