import React from 'react';
import Navbar from './components/Navbar';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import { useMsal } from '@azure/msal-react';

const App = () => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts && accounts.length > 0;

  return (
    <>
      <Navbar />
      <main>
        {isAuthenticated ? <UploadPage /> : <LoginPage />}
      </main>
    </>
  );
};

export default App;
