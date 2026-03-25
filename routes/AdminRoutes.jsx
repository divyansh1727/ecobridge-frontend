import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Users from "../admin/pages/Users";
import AdminLogin from "../admin/pages/AdminLogin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<Users />} />
    </Routes>
  );
}