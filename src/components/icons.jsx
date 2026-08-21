/* eslint-disable react-refresh/only-export-components */
import { colors } from '../theme.js'

const base = (size, color, extra) => ({
  width: size,
  height: size,
  stroke: color || 'currentColor',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...extra,
})

const svg = (size, color, children) => (
  <svg viewBox="0 0 24 24" style={base(size, color)} aria-hidden="true">
    {children}
  </svg>
)

export const IconDashboard = (p) => svg(p.size, p.color, <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>)
export const IconMonks = (p) => svg(p.size, p.color, <><circle cx="9" cy="8" r="3.2" /><path d="M2.8 20c.6-3.4 3.2-5 6.2-5s5.6 1.6 6.2 5" /><circle cx="17" cy="9" r="2.6" /><path d="M15.6 15.4c2.6-.2 4.6 1.2 5.2 3.6" /></>)
export const IconClasses = (p) => svg(p.size, p.color, <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" /><path d="M9 8h6M9 11h4" /></>)
export const IconBook = (p) => svg(p.size, p.color, <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>)
export const IconAttendance = (p) => svg(p.size, p.color, <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 12l2 2 4-4" /><path d="M8 3v3M16 3v3" /></>)
export const IconFees = (p) => svg(p.size, p.color, <><path d="M2 8.5A2.5 2.5 0 0 1 4.5 6h15A2.5 2.5 0 0 1 22 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 15.5z" /><path d="M2 9h20M6 15h4" /></>)
export const IconSettings = (p) => svg(p.size, p.color, <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09c0 .68.4 1.3 1.03 1.56a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.26.63.88 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09c-.68 0-1.3.4-1.51.97z" /></>)
export const IconSearch = (p) => svg(p.size, p.color, <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>)
export const IconGlobe = (p) => svg(p.size, p.color, <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>)
export const IconBell = (p) => svg(p.size, p.color, <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>)
export const IconChevron = (p) => svg(p.size, p.color, <path d="M6 9l6 6 6-6" />)
export const IconLogout = (p) => svg(p.size, p.color, <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></>)
export const IconUser = (p) => svg(p.size, p.color, <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" /></>)
export const IconPlus = (p) => svg(p.size, p.color, <><path d="M12 5v14M5 12h14" /></>)
export const IconCheck = (p) => svg(p.size, p.color, <path d="M20 6L9 17l-5-5" />)
export const IconX = (p) => svg(p.size, p.color, <><path d="M18 6L6 18M6 6l12 12" /></>)
export const IconEdit = (p) => svg(p.size, p.color, <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>)
export const IconTrash = (p) => svg(p.size, p.color, <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></>)
export const IconDownload = (p) => svg(p.size, p.color, <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></>)
export const IconCalendar = (p) => svg(p.size, p.color, <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>)
export const IconClock = (p) => svg(p.size, p.color, <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>)
export const IconFilter = (p) => svg(p.size, p.color, <><path d="M4 6h16M7 12h10M10 18h4" /></>)
export const IconShield = (p) => svg(p.size, p.color, <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>)

export { colors }
