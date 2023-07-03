import React, { useState, useEffect } from 'react';
import { updateUser } from '../../utilities/users-api';

export default function UpdateProfile({ profileUser, setProfileUser }) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    instagram: '',
    city: '',
    skillLevel: '',
    error: ''
  });

  useEffect(() => {
    if (profileUser) {
      setFormData({
        username: profileUser.username,
        firstName: profileUser.firstName,
        lastName: profileUser.lastName,
        email: profileUser.email,
        password: '',
        confirm: '',
        instagram: profileUser.instagram,
        city: profileUser.city,
        skillLevel: profileUser.skillLevel,
        error: ''
      });
    }
  }, [profileUser]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedUser = await updateUser({ ...formData, _id: profileUser._id });
      console.log('User updated:', updatedUser);
      setProfileUser(updatedUser); // Update the profileUser state with the updated user data
    } catch (error) {
      console.log('Update Failed:', error);
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'Update Failed - Try Again'
      }));
    }
  };
  
  const disable = formData.password !== formData.confirm;
  return (
    <div>
      <h2>Edit Profile</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="sign-form-a">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sign-form-b">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <label>Skill Level</label>
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="casual">Casual</option>
            <option value="expert">Expert</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <button type="submit" disabled={disable}>
          Update Profile
        </button>
      </form>
      {formData.error && <p className="error-message">{formData.error}</p>}
    </div>
  );
}
