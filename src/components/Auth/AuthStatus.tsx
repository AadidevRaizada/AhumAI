import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const AuthStatus: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <span className="auth-loading">Checking auth...</span>;
  }

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <div className="auth-status">
          <span className="auth-user">
            {user?.picture && (
              <img 
                src={user.picture} 
                alt={user.name || 'User'} 
                className="auth-avatar" 
              />
            )}
            <span className="auth-name">{user?.name}</span>
          </span>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default AuthStatus; 