import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import MyGames from '../../pages/MyGames/MyGames'; // Import the MyGames component
import JoinedGames from '../../pages/JoinedGames/JoinedGames'; // Import the JoinedGames component
import './RightPanel.css';

export default function RightPanel() {
  const [activeView, setActiveView] = useState('myGames');

  const handleToggle = () => {
    setActiveView(prevView => prevView === 'myGames' ? 'joinedGames' : 'myGames');
  };

  return (
    <aside className="right-panel">
      <div className="toggle-switch">
        <label>
          <input
            type="checkbox"
            checked={activeView === 'joinedGames'}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="view-content">
        <Routes>
          <Route path="/*" element={activeView === 'joinedGames' ? <JoinedGames /> : <MyGames />} />
        </Routes>
      </div>
    </aside>
  );
}
