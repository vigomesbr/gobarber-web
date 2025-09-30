import React from "react";
import { Routes, Route } from 'react-router-dom';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from './PrivateRoute';
import PublicRoute from "./PublicRoute";

const AppRoutes: React.FC = () => (
    <Routes>

        <Route element={<PublicRoute />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
    </Routes>
);

export default AppRoutes;