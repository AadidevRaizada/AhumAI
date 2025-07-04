import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={() => logout({ 
        logoutParams: { 
          returnTo: window.location.origin 
        }
      })}
      className="logout-button"
    >
      Log Out
    </button>
  );
};

export default LogoutButton; 