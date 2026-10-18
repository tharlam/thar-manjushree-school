import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n.jsx'
import { AppStoreProvider } from './store.jsx'
import PublicLayout from './layout/PublicLayout.jsx'
import RouteFallback from './components/RouteFallback.jsx'

const AdminArea = lazy(() => import('./auth/AdminArea.jsx'))
const HomePage = lazy(() => import('./pages/public/HomePage.jsx'))
const About = lazy(() => import('./pages/public/About.jsx'))
const Programs = lazy(() => import('./pages/public/Programs.jsx'))
const HouseSystem = lazy(() => import('./pages/public/HouseSystem.jsx'))
const HouseDetail = lazy(() => import('./pages/public/HouseDetail.jsx'))
const Teachers = lazy(() => import('./pages/public/Teachers.jsx'))
const Events = lazy(() => import('./pages/public/Events.jsx'))
const Tradition = lazy(() => import('./pages/public/Tradition.jsx'))
const Founder = lazy(() => import('./pages/public/Founder.jsx'))
const Lineage = lazy(() => import('./pages/public/Lineage.jsx'))
const Curriculum = lazy(() => import('./pages/public/Curriculum.jsx'))
const Schedule = lazy(() => import('./pages/public/Schedule.jsx'))
const Admissions = lazy(() => import('./pages/public/Admissions.jsx'))
const Gallery = lazy(() => import('./pages/public/Gallery.jsx'))
const Donations = lazy(() => import('./pages/public/Donations.jsx'))
const Contact = lazy(() => import('./pages/public/Contact.jsx'))

function App() {
  return (
    <LanguageProvider>
      <AppStoreProvider>
        <HashRouter>
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/admin/*" element={<AdminArea />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </AppStoreProvider>
    </LanguageProvider>
  )
}

export default App
