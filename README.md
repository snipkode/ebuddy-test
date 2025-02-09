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
4. Run the backend:
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
Happy coding! 🚀

