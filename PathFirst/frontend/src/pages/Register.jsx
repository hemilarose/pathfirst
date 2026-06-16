import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../api'
import { useAuth } from '../App'

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', password:'', role:'student', state:'Tamil Nadu', stream:'science', community:'', phone:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const f = (k, v) => setForm(p => ({...p, [k]:v}))

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await auth.register(form)
      login(res.data.user, res.data.access)
      navigate('/')
    } catch(err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed. Try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🌱</div>
          <h1 style={{ fontSize:24, fontWeight:700 }}>Create your account</h1>
          <p className="text-muted text-sm mt-1">Free forever. No hidden charges.</p>
        </div>
        <div className="card">
          <form onSubmit={submit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="mb-3">
              <div>
                <label className="label">Username *</label>
                <input className="input" placeholder="yourname123"
                  value={form.username} onChange={e=>f('username',e.target.value)} required />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" placeholder="9876543210"
                  value={form.phone} onChange={e=>f('phone',e.target.value)} />
              </div>
            </div>
            <div className="mb-3">
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@email.com"
                value={form.email} onChange={e=>f('email',e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="label">Password *</label>
              <input className="input" type="password" placeholder="Min 8 characters"
                value={form.password} onChange={e=>f('password',e.target.value)} required />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="mb-3">
              <div>
                <label className="label">I am a</label>
                <select className="select" value={form.role} onChange={e=>f('role',e.target.value)}>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <div>
                <label className="label">Stream</label>
                <select className="select" value={form.stream} onChange={e=>f('stream',e.target.value)}>
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                </select>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="mb-4">
              <div>
                <label className="label">Community</label>
                <select className="select" value={form.community} onChange={e=>f('community',e.target.value)}>
                  <option value="">Select</option>
                  <option value="OC">OC</option>
                  <option value="BC">BC</option>
                  <option value="MBC">MBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div>
                <label className="label">State</label>
                <input className="input" value={form.state}
                  onChange={e=>f('state',e.target.value)} />
              </div>
            </div>
            {error && <p className="error mb-3">{error}</p>}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
        <p className="text-sm text-muted mt-4" style={{ textAlign:'center' }}>
          Already have an account? <Link to="/login" style={{ color:'#16a34a', fontWeight:500 }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}