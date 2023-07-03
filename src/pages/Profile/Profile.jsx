import React, { useEffect, useState } from 'react';
import { getUser } from '../../utilities/users-service';
import UpdateProfile from '../../components/UpdateProfileForm/UpdateProfileForm';

export default function Profile() {
  const [profileUser, setProfileUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>

      <p>Name: {profileUser.name}</p>
      <p>Email: {profileUser.email}</p>
      {/* Add more profile information here */}

      <button onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Edit Profile'}
      </button>

      {showForm && (
        <UpdateProfile
          profileUser={profileUser}
          setProfileUser={setProfileUser}
        />
      )}
    </div>
  );
}
