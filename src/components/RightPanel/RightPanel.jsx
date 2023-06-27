import { Link, Routes, Route } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import MyGames from '../../pages/MyGames/MyGames'; // Import the MyGames component
import JoinedGames from '../../pages/JoinedGames/JoinedGames'; // Import the JoinedGames component
import './RightPanel.css';

export default function RightPanel() {
  return (
    <aside className="right-panel">
     <Link to="/my-games"> My Games</Link>
     &nbsp;&nbsp;

     
     <Link to="/joined-games"> Joined Games</Link>

      <Routes>
        <Route path="/my-games" element={<MyGames />} /> {/* Use the MyGames component */}
        <Route path="/joined-games" element={<JoinedGames />} /> {/* Use the JoinedGames component */}
      </Routes>
    </aside>
  );
}
