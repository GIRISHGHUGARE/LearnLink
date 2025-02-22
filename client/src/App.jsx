import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError, selectUserRole, selectUser, selectIsVerified } from "./redux/features/auth/authSlice";
import client from "./lib/axios";
import LandingPage from "./pages/clientPages/LandingPage";
import OtpScreen from "./pages/authPages/OtpScreen";
import ParentDashboard from "./pages/clientPages/ParentDashboard";
import TutorDashboard from "./pages/clientPages/TutorDashboard";
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(true);
  const username = useSelector(selectUser);
  const role = useSelector(selectUserRole);
  const isVerified = useSelector(selectIsVerified);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          dispatch(setLoading(true));
          const response = await client.get("/auth/verify-user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success && response.data.user) {
            dispatch(login(response.data.user));

          } else {
            dispatch(setError("Authentication failed"));
          }
        } catch (error) {
          dispatch(setError("Token verification failed"));
        } finally {
          dispatch(setLoading(false));
          setLoadingState(false);
        }
      } else {
        setLoadingState(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/otp-screen" element={isVerified ? <Navigate to="/" /> : <OtpScreen />} />
      <Route path="/parentdashboard" element={isVerified && role === "parent" ? <ParentDashboard /> : <Navigate to="/" />} />
      <Route path="/tutordashboard" element={isVerified && role === "tutor" ? <TutorDashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
