import firebaseApp from '@/firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = firebaseApp;

export const fetchUserData = async () => {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    if (usersSnapshot.empty) throw new Error('No users found');

    const users = usersSnapshot.docs.map(doc => doc.data());
    return users;
  } catch (error) {
    throw error;
  }
};
