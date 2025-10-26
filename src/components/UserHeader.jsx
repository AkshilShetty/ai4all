import React from 'react'

export default function UserHeader({ user }) {
  const loginUrl = '/.auth/login/aad' // Microsoft identity provider (Azure AD). You can change to /github etc.
  const logoutUrl = '/.auth/logout'

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>ai4all — Inventory Assistant</h1>
        <p className="small" style={{ marginTop: 6 }}>Pocket-friendly AI for small bars & restaurants</p>
      </div>

      <div>
        {user ? (
          <>
            <div className="small" style={{ marginBottom: 8 }}>Signed in as <strong>{user.userDetails}</strong></div>
            <a className="btn" href={logoutUrl}>Sign out</a>
          </>
        ) : (
          <a className="btn" href={loginUrl}>Sign in</a>
        )}
      </div>
    </div>
  )
}
