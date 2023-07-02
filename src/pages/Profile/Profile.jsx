import React, { useEffect, useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUser();
        setProfileUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profileUser.name}</p>
      <p>Email: {profileUser.email}</p>
      {/* Add more profile information here */}
      <Link to="/profile/update">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}
