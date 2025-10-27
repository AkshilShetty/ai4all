import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const LoginPage = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => console.error(e));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Welcome to AI4All</h2>
      <p>Please sign in to continue</p>
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Sign in with Microsoft
      </button>
    </div>
  );
};

export default LoginPage;
