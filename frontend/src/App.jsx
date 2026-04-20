import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './pages/Overview';
import Domains from './pages/Domains';
import DomainRoles from './pages/DomainRoles';
import RoleAccess from './pages/RoleAccess';
import Roadmap from './pages/Roadmap';
import JobsInternships from './pages/JobsInternships';
import AptitudeDashboard from './pages/AptitudeDashboard';
import ResumePage from './pages/ResumePage';
import InterviewPrepHub from './pages/InterviewPrepHub';
import CommunicationIntelligenceLab from './pages/CommunicationIntelligenceLab';
import GoogleCallback from './pages/GoogleCallback';

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import RoleLayout from './layouts/RoleLayout';
import ErrorBoundary from './components/ErrorBoundary';
import PathPilotAssistant from './components/PathPilotAssistant';
import PracticeAssistant from './components/PracticeAssistant';
import './index.css';


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/domains" replace />} />
              <Route path="/login" element={<Navigate to="/domains" replace />} />
              <Route path="/register" element={<Navigate to="/domains" replace />} />
              <Route path="/auth/callback" element={<Navigate to="/domains" replace />} />
              <Route path="/landing" element={<Landing />} />

              {/* Protected Routes with MainLayout (Dashboard, Domains) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/domains" element={<Domains />} />
                  <Route path="/domains/:id" element={<DomainRoles />} />
                  <Route path="/jobs-internships" element={<JobsInternships />} />
                  <Route path="/communication-intelligence" element={<CommunicationIntelligenceLab />} />
                  <Route path="/aptitude" element={<ErrorBoundary><AptitudeDashboard /></ErrorBoundary>} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/interview-prep" element={<InterviewPrepHub />} />

                </Route>

                {/* Protected Routes with RoleLayout (Role Details) */}
                <Route element={<RoleLayout />}>
                  <Route path="/roles/:id" element={<RoleAccess />} />
                  <Route path="/roadmap/:roleId" element={<Roadmap />} />
                </Route>
              </Route>
            </Routes>

            {/* PathPilot AI — Unified Career Mentor */}
            <PathPilotAssistant />
            <PracticeAssistant />

          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
