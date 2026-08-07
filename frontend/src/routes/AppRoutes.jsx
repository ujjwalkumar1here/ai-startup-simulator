import { Route, Routes } from "react-router-dom";
import GuestLayout from "../components/layout/GuestLayout.jsx";
import ProtectedLayout from "../components/layout/ProtectedLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicOnlyRoute from "./PublicOnlyRoute.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import NewSimulationPage from "../pages/NewSimulationPage.jsx";
import MySimulationsPage from "../pages/MySimulationsPage.jsx";
import SimulationDetailsPage from "../pages/SimulationDetailsPage.jsx";
import InvestorRoomPage from "../pages/InvestorRoomPage.jsx";
import InvestorHistoryPage from "../pages/InvestorHistoryPage.jsx";
import InvestorSessionPage from "../pages/InvestorSessionPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/simulations/new" element={<NewSimulationPage />} />
          <Route path="/simulations" element={<MySimulationsPage />} />
          <Route path="/simulations/:id" element={<SimulationDetailsPage />} />
          <Route path="/investor-room" element={<InvestorRoomPage />} />
          <Route path="/investor-history" element={<InvestorHistoryPage />} />
          <Route path="/investor-session/:id" element={<InvestorSessionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
