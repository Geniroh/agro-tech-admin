import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import NotFound from "../pages/404";
import { AuthProvider } from "../context/AuthContext";
import Innovations from "../components/Innovations";
import InnovationPreview from "../components/InnovationPreview";
import Default from "../components/Default";
import FeaturedPosts from "../components/FeaturedPosts";
import AddFeaturedPosts from "../components/AddFeaturedPosts";
import EditFeaturedPosts from "../components/EditFeaturedPosts";
import InviteAdmin from "../components/InviteAdmin";
import EditInnovation from "../components/EditInnovation";

const AuthRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Default />} />
          <Route path="innovations" element={<Innovations />} />
          <Route
            path="innovations/preview/:id"
            element={<InnovationPreview />}
          />
          <Route path="posts" element={<FeaturedPosts />} />
          <Route path="posts/add" element={<AddFeaturedPosts />} />
          <Route path="posts/:id" element={<EditFeaturedPosts />} />
          <Route path="invite" element={<InviteAdmin />} />
          <Route path="edit-access" element={<EditInnovation />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AuthRoutes;
