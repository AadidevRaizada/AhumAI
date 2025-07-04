import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="login-button"
    >
      Log In
    </button>
  );
};

export default LoginButton; 