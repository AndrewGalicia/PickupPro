import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LeftNav from '../../components/LeftNav/LeftNav';
import RightPanel from '../../components/RightPanel/RightPanel';
import CreateGame from '../CreateGame/CreateGame';
import GameDetails from '../GameDetails/GameDetails';
import PickUpGames from '../PickUpGames/PickUpGames';
import Profile from '../Profile/Profile';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <header className="header"><Header/></header>
      <div className="layout">
        <div className="main-content">
          <LeftNav/>
          <div className="main-content"></div>
          <div>
            <Routes>
              <Route path="/" element={<PickUpGames/>}/>
              <Route path="/new" element={<CreateGame/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path="/games/:id" element={<GameDetails />} />

            </Routes> 
          </div>
          <RightPanel/>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
