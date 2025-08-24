import { Route, Routes, useLocation } from "react-router-dom";
import SearchBarResultsPage from "./components/pages/SearchBarResultsPage";
import Navbar from "./components/visitors-components/Navbar";
import LandingPage from "./components/pages/LandingPage";
import MicroentrepreneurshipPage from "./components/pages/MicroentrepreneurshipPage";
import PublicationsPage from "./components/pages/PublicationsPage";
import ContactPage from "./components/pages/ContactPage";
import Login from "./components/admin-components/login/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, Role, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin-components/AdminDashboard";
import ContactRequestPage from './components/pages/ContactRequestPage';
import CreateMicroForm from "./components/admin-components/CreateMicroForm";
import AdminMicroentrepreneurships from "./components/admin-components/AdminMicroentrepreneurships";
import Chatbot from "./components/visitors-components/chatbot/Chatbot";
import EditMicroForm from "./components/admin-components/EditMicroForm";
import MicroDataView from "./components/admin-components/MicroDataView";
import AdminPublications from "./components/admin-components/AdminPublications";
import CreatePublication from "./components/admin-components/CreatePublication";
import AdminProfile from "./components/admin-components/AdminProfile";
import VisitorProfile from "./components/visitors-components/VisitorProfile";
import GeoMicroResults from "./components/visitors-components/GeoMicroResults";

const clientId = "423544897196-0atoc6jpdekc6dkkpbk03gq7la9qdjin.apps.googleusercontent.com";

function AppContent() {
  const { user } = useAuth();
  const userRole = user?.rol;
  const location = useLocation();

  const showChatbot = location.pathname !== "/login" && 
                      location.pathname !== "/user-profile" && 
                      userRole !== Role.ADMIN;

  return (
    <div className="App">
      <Navbar />
      {showChatbot && <Chatbot />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/search/microentrepreneaurship/:result" element={<SearchBarResultsPage type="microemprendimientos"/>} />
        <Route path="/search/publications/:result" element={<SearchBarResultsPage type="publicaciones" />} />
        <Route path="/microentrepreneaurship" element={<MicroentrepreneurshipPage />} />
        <Route path="/microentrepreneaurship/:subcategory" element={<MicroentrepreneurshipPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
        <Route path="/user-profile" element={<VisitorProfile />} />
        <Route path="/microentrepreneurships/nearby" element={<GeoMicroResults />} />
        <Route element={<ProtectedRoute roles={[Role.ADMIN]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path='/admin/dashboard/contact' element={<ContactRequestPage />} />
          <Route path='/admin/dashboard/contact/:id' element={<ContactRequestPage />} />
          <Route path="/admin/micro" element={<AdminMicroentrepreneurships />} />
          <Route path="/admin/create-micro" element={<CreateMicroForm />} />
          <Route path="/admin/edit-micro" element={<EditMicroForm microemprendimiento={undefined} />} />
          <Route path="/admin/view-micro" element={<MicroDataView microemprendimiento={undefined} />} />
          <Route path="/admin/publications" element={<AdminPublications />} />
          <Route path="/admin/create-publication" element={<CreatePublication />} />
          <Route path="/admin/publications/edit/:id" element={<CreatePublication isEdit={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;