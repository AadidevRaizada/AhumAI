import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        {user.picture && <img src={user.picture} alt={user.name || "User"} />}
      </div>
      <div className="profile-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Profile; 