import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './LeftNav.css';

export default function LeftNav() {
  const user = userService.getUser();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleProfileClick = () => {
    if (!user) {
      setShowLoginMessage(true);
    }
  };

  return (
    <nav className='left-nav'>
      <Link to="/new" className={user ? 'special' : 'disabled-link'}>PickUp Time!</Link>
      <Link to="/">Find a Game</Link>
      <Link to="/fields">Soccer Field</Link>
      <Link
        to={user ? `/profile/${user._id}` : ''}
        className={user ? '' : 'disabled-link'}
        onClick={handleProfileClick}
      >
        Profile
      </Link>
      {showLoginMessage && (
        <div className="login-message">
          Please login to access the profile.
        </div>
      )}
    </nav>
  );
}
