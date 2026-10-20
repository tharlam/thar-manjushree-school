import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

export default function RequireAuth({ children }) {
  const { user, loading, isAdmin, adminResolved } = useAuth()
  const location = useLocation()

  if (loading || (user && !adminResolved)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mint">
        <p role="status" className="text-sm font-semibold text-pine">
          Restoring session…
        </p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
