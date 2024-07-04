import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import Default from "../components/Default";
import NotFound from "../pages/404";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Default />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
