import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n.jsx'
import { AppStoreProvider } from './store.jsx'
import { AdminAuthProvider, useAdminAuth } from './auth/AdminAuth.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import PublicLayout from './layout/PublicLayout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MonksRoster from './pages/MonksRoster.jsx'
import ClassesCurriculum from './pages/ClassesCurriculum.jsx'
import AttendanceLogger from './pages/AttendanceLogger.jsx'
import FeesDonations from './pages/FeesDonations.jsx'
import ContentManager from './pages/ContentManager.jsx'
import Settings from './pages/Settings.jsx'
import HomePage from './pages/public/HomePage.jsx'
import Tradition from './pages/public/Tradition.jsx'
import Founder from './pages/public/Founder.jsx'
import Lineage from './pages/public/Lineage.jsx'
import Curriculum from './pages/public/Curriculum.jsx'
import Schedule from './pages/public/Schedule.jsx'
import Admissions from './pages/public/Admissions.jsx'
import Gallery from './pages/public/Gallery.jsx'
import Donations from './pages/public/Donations.jsx'
import Contact from './pages/public/Contact.jsx'

function RequireAuth({ children }) {
  const { authenticated, status } = useAdminAuth()
  if (status === 'checking') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F4EE' }}>
        <p style={{ color: '#8C1F28', fontWeight: 600, fontSize: 14 }}>Restoring session…</p>
      </div>
    )
  }
  if (!authenticated) return <Navigate to="/admin/login" replace />
  return children
}

function App() {
  return (
    <LanguageProvider>
      <AppStoreProvider>
        <AdminAuthProvider>
          <HashRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/tradition" element={<Tradition />} />
                <Route path="/founder" element={<Founder />} />
                <Route path="/lineage" element={<Lineage />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
                <Route index element={<Dashboard />} />
                <Route path="monks" element={<MonksRoster />} />
                <Route path="classes" element={<ClassesCurriculum />} />
                <Route path="attendance" element={<AttendanceLogger />} />
                <Route path="fees" element={<FeesDonations />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </AdminAuthProvider>
      </AppStoreProvider>
    </LanguageProvider>
  )
}

export default App
