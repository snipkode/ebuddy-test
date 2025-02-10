import { admin } from "./firebaseConfig";

const db = admin.firestore();

interface User {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
}

const users: User[] = [
  {
    id: "userA",
    name: "Alice Johnson",
    email: "alice@example.com",
    totalAverageWeightRatings: 4.3,
    numberOfRents: 30,
    recentlyActive: 1738938812, // 7th Feb 2025
  },
  {
    id: "userB",
    name: "Bob Smith",
    email: "bob@example.com",
    totalAverageWeightRatings: 4.3,
    numberOfRents: 30,
    recentlyActive: 1738679612, // 4th Feb 2025
  },
  {
    id: "userC",
    name: "Charlie Davis",
    email: "charlie@example.com",
    totalAverageWeightRatings: 4.3,
    numberOfRents: 28,
    recentlyActive: 1738679612, // 4th Feb 2025
  },
  {
    id: "userD",
    name: "David Lee",
    email: "david@example.com",
    totalAverageWeightRatings: 4.5,
    numberOfRents: 25,
    recentlyActive: 1738800000, // 6th Feb 2025
  },
  {
    id: "userE",
    name: "Emma White",
    email: "emma@example.com",
    totalAverageWeightRatings: 4.2,
    numberOfRents: 40,
    recentlyActive: 1738600000, // 3rd Feb 2025
  },
];


async function seedUsers() {
  const batch = db.batch();
  
  users.forEach((user) => {
    const userRef = db.collection("USERS").doc(user.id);
    batch.set(userRef, user);
  });

  await batch.commit();
  console.log("Users seeded successfully!");
}


seedUsers().catch(console.error);
