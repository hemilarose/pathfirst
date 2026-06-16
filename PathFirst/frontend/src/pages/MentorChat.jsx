import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { mentorship } from '../api'
import { useAuth } from '../App'

export default function MentorChat() {
  const { user } = useAuth()
  const [mentors, setMentors] = useState([])
  const [activeMentor, setActiveMentor] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { mentorship.mentors().then(r => setMentors(r.data)) }, [])

  useEffect(() => {
    if (!activeMentor) return
    mentorship.getChat(activeMentor.mentor.id).then(r => setMessages(r.data))
    const t = setInterval(() => mentorship.getChat(activeMentor.mentor.id).then(r => setMessages(r.data)), 5000)
    return () => clearInterval(t)
  }, [activeMentor])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setSending(true)
    try {
      await mentorship.sendMessage(activeMentor.mentor.id, text)
      setText('')
      const r = await mentorship.getChat(activeMentor.mentor.id)
      setMessages(r.data)
    } finally { setSending(false) }
  }

  if (!user) return (
    <div className="container" style={{ padding:'64px 20px', textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>💬</div>
      <h2 style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>Login to chat with mentors</h2>
      <p className="text-muted mb-4">Real college students answer your questions.</p>
      <Link to="/login" className="btn btn-primary">Log in to chat</Link>
    </div>
  )

  return (
    <div className="container" style={{ padding:'32px 20px' }}>
      <div className="mb-6">
        <h1 style={{ fontSize:26, fontWeight:700 }}>💬 Ask a Mentor</h1>
        <p className="text-muted mt-1">Chat with college students who went through the same process</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: activeMentor ? '280px 1fr' : '1fr', gap:16, minHeight:500 }}>
        <div>
          <div style={{ fontSize:13, color:'#6b7280', marginBottom:10 }}>{mentors.length} mentors available</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {mentors.length === 0 && (
              <p style={{ fontSize:13, color:'#6b7280', padding:16, textAlign:'center', background:'#f9fafb', borderRadius:10 }}>
                No mentors yet.
              </p>
            )}
            {mentors.map(m => (
              <div key={m.id} className="card" style={{ cursor:'pointer', padding:'12px 14px',
                border:`2px solid ${activeMentor?.id===m.id?'#16a34a':'#e5e7eb'}`,
                background: activeMentor?.id===m.id?'#f0fdf4':'#fff' }}
                onClick={() => setActiveMentor(m)}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontWeight:600, fontSize:14 }}>{m.mentor.username}</span>
                  <span style={{ fontSize:10, background:'#dcfce7', color:'#15803d', padding:'2px 6px', borderRadius:10 }}>Active</span>
                </div>
                <div style={{ fontSize:12, color:'#6b7280' }}>{m.college}</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>Year {m.year} • {m.department}</div>
                <div style={{ fontSize:12, color:'#374151', marginTop:4 }}>
                  {m.subjects.split(',').slice(0,2).map(s=>(
                    <span key={s} style={{ background:'#f3f4f6', padding:'2px 6px', borderRadius:4, marginRight:4, fontSize:11 }}>{s.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {activeMentor && (
          <div style={{ display:'flex', flexDirection:'column', background:'#fff', borderRadius:10, border:'1px solid #e5e7eb', overflow:'hidden' }}>
            <div style={{ padding:'14px 16px', borderBottom:'1px solid #e5e7eb', background:'#f9fafb' }}>
              <div style={{ fontWeight:600 }}>{activeMentor.mentor.username}</div>
              <div style={{ fontSize:12, color:'#6b7280' }}>{activeMentor.college} · {activeMentor.subjects}</div>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:10, minHeight:300, maxHeight:420 }}>
              {messages.length === 0 && (
                <div style={{ textAlign:'center', color:'#6b7280', marginTop:40 }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>👋</div>
                  <p style={{ fontSize:14 }}>Say hi! Ask {activeMentor.mentor.username} anything.</p>
                </div>
              )}
              {messages.map(msg => {
                const isMe = msg.sender === user.id
                return (
                  <div key={msg.id} style={{ display:'flex', justifyContent: isMe?'flex-end':'flex-start' }}>
                    <div style={{ maxWidth:'75%', padding:'8px 12px', borderRadius:12,
                      borderBottomRightRadius: isMe?2:12, borderBottomLeftRadius: isMe?12:2,
                      background: isMe?'#16a34a':'#f3f4f6', color: isMe?'#fff':'#111827', fontSize:14 }}>
                      <p style={{ margin:0 }}>{msg.message}</p>
                      <div style={{ fontSize:11, opacity:.7, marginTop:3, textAlign:'right' }}>
                        {new Date(msg.timestamp).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={send} style={{ padding:'12px 16px', borderTop:'1px solid #e5e7eb', display:'flex', gap:8 }}>
              <input className="input" style={{ flex:1 }} placeholder="Type your question..."
                value={text} onChange={e=>setText(e.target.value)} />
              <button className="btn btn-primary" type="submit" disabled={sending || !text.trim()}>Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}