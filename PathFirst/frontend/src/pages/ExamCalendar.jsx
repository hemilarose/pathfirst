import { useState, useEffect } from 'react'
import { exams } from '../api'
import { useLang } from '../Context/LanguageContext'

export default function ExamCalendar() {
  const [data, setData] = useState([])
  const [stream, setStream] = useState('')
  const [loading, setLoading] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    setLoading(true)
    exams.list(stream ? { stream } : {}).then(r => setData(r.data)).finally(() => setLoading(false))
  }, [stream])

  const streamBtns = [
    { val:'', label: t.exams.allStreams },
    { val:'science', label:'Science / அறிவியல்' },
    { val:'commerce', label:'Commerce / வணிகம்' },
    { val:'arts', label:'Arts / கலை' },
  ]

  return (
    <div style={{ background:'#f8fafc', minHeight:'100vh', padding:'32px 0' }}>
      <div className="container">
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:28, fontWeight:700 }}>📅 {t.exams.title}</h1>
          <p style={{ color:'#6b7280', marginTop:6 }}>{t.exams.subtitle}</p>
        </div>

        {/* Stream filter */}
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {streamBtns.map(s => (
            <button key={s.val} onClick={() => setStream(s.val)} style={{
              padding:'7px 16px', borderRadius:20, fontSize:13, fontWeight:500, cursor:'pointer',
              background: stream===s.val ? '#16a34a' : '#fff',
              color: stream===s.val ? '#fff' : '#374151',
              border: `1.5px solid ${stream===s.val ? '#16a34a' : '#e5e7eb'}`,
              transition:'all .15s'
            }}>{s.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#6b7280' }}>Loading...</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
            {data.map(exam => (
              <div key={exam.id} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:12 }}>

                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ fontSize:24, fontWeight:800, color:'#16a34a', lineHeight:1 }}>{exam.short_name}</div>
                    <div style={{ fontSize:12, color:'#6b7280', marginTop:3, lineHeight:1.4 }}>{exam.name}</div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end' }}>
                    <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, fontWeight:500,
                      background: exam.stream==='all'?'#f3f4f6':'#eff6ff',
                      color: exam.stream==='all'?'#6b7280':'#2563eb' }}>
                      {exam.stream==='all' ? t.exams.allStreams : exam.stream}
                    </span>
                    <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, fontWeight:500,
                      background: exam.state==='National'?'#fff7ed':'#dcfce7',
                      color: exam.state==='National'?'#ea580c':'#15803d' }}>
                      {exam.state}
                    </span>
                  </div>
                </div>

                {/* Dates grid */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div style={{ background:'#f8fafc', borderRadius:8, padding:10 }}>
                    <div style={{ fontSize:11, color:'#6b7280', marginBottom:3 }}>{t.exams.regCloses}</div>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>
                      {new Date(exam.registration_end).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                    </div>
                    <span style={{ fontSize:11, padding:'2px 8px', borderRadius:10, fontWeight:500,
                      background: exam.days_to_registration_end < 0 ? '#fee2e2' : exam.days_to_registration_end < 30 ? '#fff7ed' : '#dcfce7',
                      color: exam.days_to_registration_end < 0 ? '#dc2626' : exam.days_to_registration_end < 30 ? '#ea580c' : '#15803d' }}>
                      {exam.days_to_registration_end < 0 ? t.exams.closed : `${exam.days_to_registration_end} ${t.exams.daysLeft}`}
                    </span>
                  </div>
                  <div style={{ background:'#f8fafc', borderRadius:8, padding:10 }}>
                    <div style={{ fontSize:11, color:'#6b7280', marginBottom:3 }}>{t.exams.examDate}</div>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>
                      {new Date(exam.exam_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                    </div>
                    <span style={{ fontSize:11, padding:'2px 8px', borderRadius:10, fontWeight:500,
                      background: exam.days_to_exam < 0 ? '#fee2e2' : exam.days_to_exam < 60 ? '#fff7ed' : '#eff6ff',
                      color: exam.days_to_exam < 0 ? '#dc2626' : exam.days_to_exam < 60 ? '#ea580c' : '#2563eb' }}>
                      {exam.days_to_exam < 0 ? t.exams.passed : `${exam.days_to_exam} ${t.exams.daysLeft}`}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {exam.description && (
                  <p style={{ fontSize:13, color:'#4b5563', lineHeight:1.6 }}>{exam.description}</p>
                )}

                {/* Eligibility */}
                {exam.eligibility && (
                  <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'8px 12px', fontSize:12, color:'#15803d' }}>
                    <span style={{ fontWeight:600 }}>{t.exams.eligibility} </span>{exam.eligibility}
                  </div>
                )}

                <a href={exam.official_link} target="_blank" rel="noreferrer"
                  style={{ display:'block', textAlign:'center', background:'#16a34a', color:'#fff', padding:'9px', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none', marginTop:'auto' }}>
                  {t.exams.officialSite}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}