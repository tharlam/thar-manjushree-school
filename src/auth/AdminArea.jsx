import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthProvider.jsx'
import RequireAuth from './RequireAuth.jsx'
import DashboardLayout from '../layout/DashboardLayout.jsx'
import RouteFallback from '../components/RouteFallback.jsx'

const AdminLogin = lazy(() => import('../pages/AdminLogin.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const MonksRoster = lazy(() => import('../pages/MonksRoster.jsx'))
const AttendanceLogger = lazy(() => import('../pages/AttendanceLogger.jsx'))
const AdmissionManagement = lazy(() => import('../pages/AdmissionManagement.jsx'))
const HouseManagement = lazy(() => import('../pages/HouseManagement.jsx'))
const ContentManager = lazy(() => import('../pages/ContentManager.jsx'))
const EventsManagement = lazy(() => import('../pages/EventsManagement.jsx'))
const UserManagement = lazy(() => import('../pages/UserManagement.jsx'))
const Settings = lazy(() => import('../pages/Settings.jsx'))
const Notification = lazy(() => import('../pages/Notification.jsx'))

export default function AdminArea() {
  return (
    <AuthProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
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
      </Suspense>
    </AuthProvider>
  )
}
