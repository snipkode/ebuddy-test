import { admin } from '../config/firebaseConfig';
import { User } from '../entities/user';

const db = admin.firestore();
const userCollection = db.collection('USERS');


/**
 * Create a new user in Firestore
 */
export const createUser = async (user: User): Promise<void> => {
  await userCollection.doc(user.userId).set(user);
};

/**
 * Update an existing user (partial update)
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
  await userCollection.doc(userId).set(userData, { merge: true });
};

/**
 * Fetch a single user by ID
 */
export const fetchUser = async (userId: string): Promise<User | null> => {
  const userDoc = await userCollection.doc(userId).get();
  return userDoc.exists ? (userDoc.data() as User) : null;
};

/**
 * Fetch users with sorting & pagination
 */
export const fetchUsers = async (
  limit: number = 10,
  lastVisibleDoc?: FirebaseFirestore.DocumentSnapshot
): Promise<{ users: User[]; lastDoc: FirebaseFirestore.DocumentSnapshot | null }> => {
  let query = userCollection
    .orderBy("totalAverageWeightRatings", "desc")
    .orderBy("numberOfRents", "desc")
    .orderBy("recentlyActive", "desc")
    .limit(limit);

  // Handle pagination
  if (lastVisibleDoc) {
    query = query.startAfter(lastVisibleDoc);
  }

  const snapshot = await query.get();
  const users = snapshot.docs.map(doc => doc.data() as User);
  const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return { users, lastDoc };
};

/**
 * Delete a user from Firestore
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await userCollection.doc(userId).delete();
};
