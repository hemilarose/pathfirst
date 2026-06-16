import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../api'
import { useAuth } from '../App'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await auth.login(form)
      login(res.data.user, res.data.access)
      navigate('/')
    } catch {
      setError('Invalid username or password')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>👋</div>
          <h1 style={{ fontSize:24, fontWeight:700 }}>Welcome back</h1>
          <p className="text-muted text-sm mt-1">Log in to your PathFirst account</p>
        </div>
        <div className="card">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="label">Username</label>
              <input className="input" placeholder="your username"
                value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            {error && <p className="error mb-3">{error}</p>}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
        <p className="text-sm text-muted mt-4" style={{ textAlign:'center' }}>
          Don't have an account? <Link to="/register" style={{ color:'#16a34a', fontWeight:500 }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}