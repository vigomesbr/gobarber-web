import React from "react";
import { Routes, Route } from 'react-router-dom';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from './PrivateRoute';
import PublicRoute from "./PublicRoute";
import Profile from "../pages/Profile";

const AppRoutes: React.FC = () => (
    <Routes>

        <Route element={<PublicRoute />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Route>

    </Routes>
);

export default AppRoutes;