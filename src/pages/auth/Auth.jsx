import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-black gradient-text tracking-widest" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            ✦ COSMEX
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-1">{title}</h1>
          <p className="text-slate-400 text-sm">{subtitle}</p>
        </div>
        <div className="card p-8 border-blue-500/20">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast.error(error.message); setLoading(false) }
    else { toast.success('Welcome back!'); navigate('/feed') }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your COSMEX account">
      <form onSubmit={handle} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            className="input-cosmos" placeholder="your@email.com" required />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
            className="input-cosmos" placeholder="••••••••" required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 py-3">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <p className="text-center text-sm text-slate-500">
          No account? <Link to="/register" className="text-blue-400 hover:text-blue-300">Join free</Link>
        </p>
      </form>
    </AuthCard>
  )
}

export function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username } }
    })
    if (error) { toast.error(error.message); setLoading(false) }
    else { toast.success('Account created! Check your email.'); navigate('/feed') }
  }

  return (
    <AuthCard title="Join COSMEX" subtitle="Create your free explorer account">
      <form onSubmit={handle} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Username</label>
          <input type="text" value={username} onChange={e=>setUsername(e.target.value)}
            className="input-cosmos" placeholder="StarPilot_88" required minLength={3} />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            className="input-cosmos" placeholder="your@email.com" required />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
            className="input-cosmos" placeholder="min 6 characters" required minLength={6} />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 py-3">
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-center text-sm text-slate-500">
          Have account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
      </form>
    </AuthCard>
  )
}
