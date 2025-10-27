import React from 'react';
import { useMsal } from '@azure/msal-react';

const Navbar = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts && accounts.length > 0;

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <nav className="navbar">
      <h1>AI4All</h1>
      {isAuthenticated && (
        <div>
          <span style={{ marginRight: '10px' }}>{accounts[0].username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
