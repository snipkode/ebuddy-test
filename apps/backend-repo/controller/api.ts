import { Request, Response } from 'express';
import { createUser, updateUser, fetchUser, fetchUsers, deleteUser } from '../repository/userCollection';

/**
 * Create a new user
 */
export const createUserData = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    await createUser(user);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user: ' + error.message);
  }
};

/**
 * Update existing user
 */
export const updateUserData = async (req: Request, res: Response) => {
  const { userId, userData } = req.body;
  try {
    await updateUser(userId, userData);
    res.status(200).send('User data updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user data: ' + error.message);
  }
};

/**
 * Fetch a single user by ID
 */
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

/**
 * Fetch multiple users with sorting & pagination
 */
export const fetchUsersData = async (req: Request, res: Response) => {
  const { limit, lastVisible } = req.query;
  
  try {
    const { users, lastDoc } = await fetchUsers(
      parseInt(limit as string) || 10,
      lastVisible ? JSON.parse(lastVisible as string) : undefined
    );

    res.status(200).json({ users, lastVisible: lastDoc?.id || null });
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
};

/**
 * Delete a user by ID
 */
export const deleteUserData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await deleteUser(userId);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
};
