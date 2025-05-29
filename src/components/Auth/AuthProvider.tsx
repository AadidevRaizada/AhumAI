import React, { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from '../../config';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { domain, clientId, redirectUri, audience, scope } = auth0Config;

  if (!domain || !clientId) {
    console.warn('Auth0 domain or client ID not set in environment variables');
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: scope,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider; 