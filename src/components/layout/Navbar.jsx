import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useStore from '../../store/useStore'
import toast from 'react-hot-toast'

const NAV = [
  { to: '/feed', label: 'Feed', icon: '🌌' },
  { to: '/market', label: 'Market', icon: '🛒' },
  { to: '/used', label: 'Used', icon: '♻️' },
  { to: '/new', label: 'New', icon: '✨' },
  { to: '/deals', label: 'Deals', icon: '🔥' },
  { to: '/chat', label: 'Chat', icon: '💬' },
]

const LANGS = [
  {code:'en',flag:'🇺🇸',name:'EN'},{code:'ua',flag:'🇺🇦',name:'UA'},
  {code:'ru',flag:'🇷🇺',name:'RU'},{code:'de',flag:'🇩🇪',name:'DE'},
  {code:'fr',flag:'🇫🇷',name:'FR'},{code:'es',flag:'🇪🇸',name:'ES'},
  {code:'cn',flag:'🇨🇳',name:'CN'},{code:'tr',flag:'🇹🇷',name:'TR'},
  {code:'pl',flag:'🇵🇱',name:'PL'},
]

export default function Navbar() {
  const { user, profile, signOut } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut(); toast.success('Signed out'); navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="font-black tracking-widest text-lg gradient-text flex-shrink-0" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          ✦ COSMEX
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map(({ to, label, icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
                  ${active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className="text-xs">{icon}</span> {label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Lang */}
          <select className="bg-white/5 border border-white/10 text-slate-300 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer">
            {LANGS.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>

          {/* Sell button */}
          {user && (
            <Link to="/sell" className="btn-primary text-sm py-1.5 px-4 hidden md:block">
              + Sell
            </Link>
          )}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold cursor-pointer"
                title={profile?.username || user.email}>
                {(profile?.username?.[0] || user.email?.[0] || '?').toUpperCase()}
              </div>
              <button onClick={handleSignOut} className="text-xs text-slate-500 hover:text-white transition-colors">
                Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn-ghost text-sm py-1.5 px-4">Sign in</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Join free</Link>
            </div>
          )}

          {/* Mobile burger */}
          <button className="md:hidden text-slate-400 hover:text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="2" rx="1"/><rect y="9" width="20" height="2" rx="1"/><rect y="15" width="20" height="2" rx="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/8 px-4 py-3 flex flex-col gap-1">
          {NAV.map(({ to, label, icon }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5">
              {icon} {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
