import { admin } from '@/config/firebaseConfig';
import { User } from '@/entities/user';

export const updateUser = async (userId: string, userData: Partial<User>) => {
  await admin.firestore().collection('USERS').doc(userId).set(userData, { merge: true });
};

export const fetchUser = async (userId: string): Promise<User | null> => {
  const userDoc = await admin.firestore().collection('USERS').doc(userId).get();
  return userDoc.exists ? (userDoc.data() as User) : null;
};
