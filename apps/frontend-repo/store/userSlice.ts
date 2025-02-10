import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "./store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from '@/firebase/firebaseConfig';

interface UserState {
  user: User | null;
  userData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userData: null,
  loading: true,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    return new Promise<User | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchUserData = createAsyncThunk("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, 'USERS');
    const usersSnapshot = await getDocs(usersCollection);

    if (usersSnapshot.empty) throw new Error('No users found');

    const users = usersSnapshot.docs.map(doc => doc.data());
    return users;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserData = (state: RootState) => state.user.userData;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
export default userSlice.reducer;
