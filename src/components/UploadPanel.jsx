import React, { useRef, useState } from 'react'

export default function UploadPanel({ user }) {
  const fileRef = useRef()
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const functionUrl = import.meta.env.VITE_FUNCTION_URL || '' // from .env (local) or the Static Web App app settings

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    setProgress(0)

    if (!user) {
      setStatus('Please sign in first.')
      return
    }

    const files = fileRef.current.files
    if (!files || files.length === 0) {
      setStatus('Please choose at least one file.')
      return
    }

    if (!functionUrl) {
      setStatus('Function URL not configured. Set VITE_FUNCTION_URL in .env or your Static Web App environment.')
      return
    }

    const fd = new FormData()
    for (let i = 0; i < files.length; i++) {
      fd.append('files', files[i])
    }

    // include username so backend can place in blob under username/
    fd.append('username', user.userDetails || 'anonymous')

    try {
      setDisabled(true)
      setStatus('Uploading...')
      // Use fetch with streaming progress is not directly available; we simulate progress
      const res = await fetch(functionUrl, {
        method: 'POST',
        body: fd,
        credentials: 'include' // ensure cookies for SWA auth passed
      })

      if (!res.ok) {
        const text = await res.text()
        setStatus('Upload failed: ' + (text || res.statusText))
        setDisabled(false)
        return
      }

      const text = await res.text()
      setStatus('Upload successful: ' + text)
      setProgress(100)
    } catch (err) {
      setStatus('Error: ' + err.message)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="input" ref={fileRef} type="file" multiple accept=".csv,.xls,.xlsx,image/*" />
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button type="submit" className="btn" disabled={disabled}>{disabled ? 'Uploading...' : 'Upload'}</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="small">{status}</div>
        {progress > 0 && <div style={{ marginTop: 8, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 6 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#06b6d4', borderRadius: 6 }} />
        </div>}
      </div>
    </form>
  )
}
