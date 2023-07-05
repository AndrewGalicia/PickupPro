import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import MyGames from '../../pages/MyGames/MyGames'; // Import the MyGames component
import JoinedGames from '../../pages/JoinedGames/JoinedGames'; // Import the JoinedGames component
import './RightPanel.css';

export default function RightPanel({ user }) {
  const [activeView, setActiveView] = useState('myGames');

  const handleToggle = () => {
    setActiveView(prevView => (prevView === 'myGames' ? 'joinedGames' : 'myGames'));
  };

  const loggedInContent = (
    <>
      <div className="toggle-switch">
        <label>
          <input type="checkbox" checked={activeView === 'joinedGames'} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="view-content">
        <Routes>
          <Route
            path="/*"
            element={activeView === 'joinedGames' ? <JoinedGames user={user} /> : <MyGames />}
          />
        </Routes>
      </div>
    </>
  );

  const loggedOutContent = (
    <div className="please-login">
      <p>Please log in</p>
    </div>
  );

  return <aside className="right-panel">{user ? loggedInContent : loggedOutContent}</aside>;
}
