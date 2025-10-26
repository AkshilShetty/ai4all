import React, { useEffect, useState } from 'react'
import UploadPanel from './components/UploadPanel'
import UserHeader from './components/UserHeader'

export default function App() {
  const [user, setUser] = useState(null)

  // Check /.auth/me to see Azure Static Web Apps auth status
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/.auth/me')
        if (!res.ok) {
          setUser(null)
          return
        }
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          // SWA returns clientPrincipal in array for some setups; handle gracefully
          const principal = data[0].userId ? data[0] : data
          // try to get useful fields
          const userDetails = data.clientPrincipal ? data.clientPrincipal.userDetails : (data[0]?.userId || null)
          setUser({ raw: data, userDetails })
        } else if (data.clientPrincipal) {
          setUser({ raw: data, userDetails: data.clientPrincipal.userDetails })
        } else {
          setUser(null)
        }
      } catch (err) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <UserHeader user={user} />
        <div style={{ marginTop: 18 }}>
          <h2 style={{ marginBottom: 6 }}>Upload inventory (Excel) or photos</h2>
          <p className="small">You can select multiple files. Files are sent securely to the backend and organized per username.</p>
          <UploadPanel user={user} />
        </div>
      </div>
    </div>
  )
}
