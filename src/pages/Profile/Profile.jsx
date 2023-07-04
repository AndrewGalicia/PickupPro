import React, { useEffect, useState } from 'react';
import { getUser } from '../../utilities/users-service';
import UpdateProfile from '../../components/UpdateProfileForm/UpdateProfileForm';
import "./Profile.css"
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
    <div className='Profile-Page'>
      <h2>Profile Details</h2>
      <p>Name: {profileUser.firstName} {profileUser.lastName}</p>
      <p>Email: {profileUser.email}</p>
      <p>Instagram: {profileUser.instagram}</p>
      <p>City: {profileUser.city}</p>
      <p>SkillLevel: {profileUser.skillLevel}</p>
      
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
