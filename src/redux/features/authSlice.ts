import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  name: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  name: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")!).name
    : null,
  isAuthenticated: !!localStorage.getItem("auth"),
  loading: false,
  error: null,
};

const VALID_CREDENTIALS = {
  username: "admin",
  password: "password123",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validate credentials
      if (
        credentials.username !== VALID_CREDENTIALS.username ||
        credentials.password !== VALID_CREDENTIALS.password
      ) {
        throw new Error("Invalid username or password");
      }

      const name = "Admin User";
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, name })
      );
      return { name };
    } catch (error: any) {
      // Explicitly return the error message
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
    initializeAuth: (state) => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        try {
          const { isAuthenticated, name } = JSON.parse(authData);
          state.isAuthenticated = isAuthenticated;
          state.name = name;
        } catch (error) {
          localStorage.removeItem("auth");
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.name = action.payload.name;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, initializeAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
