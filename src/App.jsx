import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n.jsx'
import { AppStoreProvider } from './store.jsx'
import { AdminAuthProvider, useAdminAuth } from './auth/AdminAuth.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import PublicLayout from './layout/PublicLayout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MonksRoster from './pages/MonksRoster.jsx'
import AttendanceLogger from './pages/AttendanceLogger.jsx'
import ContentManager from './pages/ContentManager.jsx'
import Settings from './pages/Settings.jsx'
import HomePage from './pages/public/HomePage.jsx'
import About from './pages/public/About.jsx'
import Programs from './pages/public/Programs.jsx'
import HouseSystem from './pages/public/HouseSystem.jsx'
import HouseDetail from './pages/public/HouseDetail.jsx'
import Teachers from './pages/public/Teachers.jsx'
import Events from './pages/public/Events.jsx'
import Tradition from './pages/public/Tradition.jsx'
import Founder from './pages/public/Founder.jsx'
import Lineage from './pages/public/Lineage.jsx'
import Curriculum from './pages/public/Curriculum.jsx'
import Schedule from './pages/public/Schedule.jsx'
import Admissions from './pages/public/Admissions.jsx'
import Gallery from './pages/public/Gallery.jsx'
import Donations from './pages/public/Donations.jsx'
import Contact from './pages/public/Contact.jsx'
import AdmissionManagement from './pages/AdmissionManagement.jsx'
import HouseManagement from './pages/HouseManagement.jsx'
import EventsManagement from './pages/EventsManagement.jsx'
import UserManagement from './pages/UserManagement.jsx'
import Notification from './pages/Notification.jsx'

function RequireAuth({ children }) {
  const { authenticated, status } = useAdminAuth()
  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mint">
        <p className="text-sm font-semibold text-pine">Restoring session…</p>
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
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/houses" element={<HouseSystem />} />
                <Route path="/houses/:houseId" element={<HouseDetail />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/donate" element={<Donations />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tradition" element={<Tradition />} />
                <Route path="/founder" element={<Founder />} />
                <Route path="/lineage" element={<Lineage />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/schedule" element={<Schedule />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
                <Route index element={<Dashboard />} />
                <Route path="monks" element={<MonksRoster />} />
                <Route path="attendance" element={<AttendanceLogger />} />
                <Route path="admissions" element={<AdmissionManagement />} />
                <Route path="houses" element={<HouseManagement />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="events" element={<EventsManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notification />} />
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
