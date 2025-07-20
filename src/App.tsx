import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { initializeAuth } from "@/redux/features/authSlice";
import { initializeMenu } from "@/redux/features/menuSlice";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import Home from "@/components/Dashboard/Dashboard";
import Settings from "@/components/Settings/Settings";
import Login from "@/components/LoginPage/LoginPage";
import Layout from "@/components/Layouts/Layout";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeMenu());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
