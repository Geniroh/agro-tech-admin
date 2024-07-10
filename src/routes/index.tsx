import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AuthRoutes from "./AuthRoutes";
import Register from "../pages/Register";

const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/:token" element={<Register />} />
        <Route path="*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoutes;
