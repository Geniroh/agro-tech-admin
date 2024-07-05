import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import NotFound from "../pages/404";
import { AuthProvider } from "../context/AuthContext";
import Innovations from "../components/Innovations";
import InnovationPreview from "../components/InnovationPreview";

const AuthRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Innovations />} />
          <Route path="innovations" element={<Innovations />} />
          <Route
            path="innovations/preview/:id"
            element={<InnovationPreview />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AuthRoutes;
