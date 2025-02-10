# Monorepo Project with Node.js, Next.js, and Firebase

## 📌 Overview
This project is a **monorepo** setup using **Turbo.build**, integrating **Node.js** for the backend, **Next.js** for the frontend, and **Firebase** as the database.

## 🏗 Tech Stack
- **Backend:** Node.js with Firebase Admin SDK
- **Frontend:** Next.js
- **Database:** Firebase Firestore
- **Monorepo Tooling:** Turbo.build

## 📁 Project Structure
```
/monorepo-project
│── apps/
│   │── backend-repo/  # Node.js API
│   │── frontend-repo/ # Next.js Application
│── packages/
│── turbo.json
│── package.json
│── README.md
```

## 🔧 Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd apps/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add Firebase **service account key**:
   - Place `serviceAccountKey.json` inside `apps/backend-repo/firebase/`.
   - This file is required to authenticate Firebase Admin SDK.
4. Generate Users Mock Dummy from backend:
   ```sh
   npm run gen:mock
   ```
5. Run the backend:
   ```sh
   npm run dev
   ```

## 🌍 Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd apps/frontend-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase:
   - Modify `.env` file in `apps/frontend-repo/` with Firebase configuration.
   ```sh
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Run the frontend:
   ```sh
   npm run dev
   ```

## 🔑 Authentication & API Testing
### 1️⃣ Update User API (PUT)
```sh
curl --location --request PUT 'http://localhost:3000/user/update-user-data' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data-raw '{   
    "userId": "QKIJx6NoXmCefmQgMy51",
    "userData": {
        "name": "Alam S Wibowo",
        "email": "alamhafidz61@gmail.com"
    }
}'
```

### 2️⃣ Fetch User Data API (GET)
```sh
curl --location --request GET 'http://localhost:3000/user/fetch-user-data?userId=QKIJx6NoXmCefmQgMy51' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{access_token}}'
```

## 🔒 Authentication Token Handling
- Instead of checking Firebase Admin tokens twice, a **dummy token** should be created and used for API authorization.
- Ensure API calls include the `Authorization` header with the dummy token.

## 🚀 Running the Monorepo with Turbo
To run both **backend** and **frontend** simultaneously:
```sh
npx turbo run dev
```

## 🎯 Notes
- Always ensure `serviceAccountKey.json` is correctly placed in `apps/backend-repo/firebase/`.
- Update the `.env` file in `apps/frontend-repo/` with the correct Firebase credentials.
- API calls require a **dummy token** for authentication instead of Firebase Admin token double-checking.

---

### **Required Firestore Index**
To support this query:
```typescript
.orderBy("totalAverageWeightRatings", "desc")
.orderBy("numberOfRents", "desc")
.orderBy("recentlyActive", "desc")
.limit(limit)
```
You must create a **composite index** in Firestore.

#### **How to Create the Index Manually**
1. **Go to Firebase Console** → [Firestore Database](https://console.firebase.google.com/)
2. Click **Indexes** in the left panel
3. Click **Create Index**
4. Set the index fields as follows:
   | Field Name                     | Order  |
   |--------------------------------|--------|
   | `totalAverageWeightRatings`    | Descending |
   | `numberOfRents`                | Descending |
   | `recentlyActive`               | Descending |

5. Click **Create** and wait for Firestore to build the index.

---

### **Alternative: Deploy Index Using Firestore Rules (`firestore.indexes.json`)**
If you're using Firebase CLI, add this to your `firestore.indexes.json`:
```json
{
  "indexes": [
    {
      "collectionGroup": "USERS",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "totalAverageWeightRatings", "order": "DESCENDING" },
        { "fieldPath": "numberOfRents", "order": "DESCENDING" },
        { "fieldPath": "recentlyActive", "order": "DESCENDING" }
      ]
    }
  ]
}
```
Then, deploy the indexes using:
```bash
firebase deploy --only firestore:indexes
```

---

### ✅ **Why is This Necessary?**
- Firestore **does not support multiple `orderBy` without an index**.
- **Composite indexes** allow complex queries with multiple sort fields.
- **Performance optimization** for sorting & pagination.

Happy coding! 🚀

## Question Interview 

1. **What are the most difficult technical problems in your work experience you have encountered and how do you fix them?**  
   One of the most challenging technical problems I faced was optimizing the performance of a React/Next.js application that had slow page loads due to large API responses and inefficient state management. I resolved this by implementing server-side rendering (SSR) for critical pages, using React Query for efficient data fetching and caching, and optimizing API responses by reducing unnecessary data. These improvements significantly enhanced the app’s performance and user experience.  

2. **When you’re working on a project, how do you typically approach it from start to finish?**  
   My approach follows these steps:  
   - **Understanding Requirements:** I clarify the project scope and expectations.  
   - **Planning:** I break down tasks, set priorities, and establish a timeline.  
   - **Development:** I build the project iteratively, ensuring modular and maintainable code.  
   - **Testing & Optimization:** I conduct testing (unit/integration testing) and optimize performance.  
   - **Deployment & Feedback:** I deploy the project, gather feedback, and make necessary refinements.  

3. **How do you usually approach learning a new topic to absorb as much as possible?**  
   I follow a structured learning approach:  
   - Start with official documentation and tutorials.  
   - Apply concepts through small projects or real-world implementations.  
   - Engage in community discussions (forums, GitHub, Discord).  
   - Teach or create content (blog, YouTube videos) to reinforce learning.  

4. **“Consistency” vs “Fast & Efficient”. Choose one.**  
   **Consistency.** I believe sustainable progress and high-quality work come from maintaining a consistent workflow, which leads to long-term efficiency.  

5. **Do you own any Apple products? Like iMac, MacBook, iPad, iPhone, etc.?**  
   Yes, I use a MacBook 2015, Windows 11 OS and Iphone 15 Pro Max for development due to its seamless integration with development tools, especially for web and mobile development.  

6. **What is your immediate availability to start this job?**  
   I am available to start immediately / within 1 week (adjust based on your situation).  




