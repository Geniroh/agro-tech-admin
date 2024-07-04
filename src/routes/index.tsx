import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AuthRoutes from "./AuthRoutes";

const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoutes;
