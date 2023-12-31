import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Header from '../../components/Header/Header';
import LeftNav from '../../components/LeftNav/LeftNav';
import RightPanel from '../../components/RightPanel/RightPanel';
import CreateGame from '../CreateGame/CreateGame';
import SoccerFields from '../SoccerFields/SoccerFields';
import GameDetails from '../GameDetails/GameDetails';
import PickUpGames from '../PickUpGames/PickUpGames';
import Profile from '../Profile/Profile';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import UpdateProfile from '../../components/UpdateProfileForm/UpdateProfileForm';

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform any additional login logic or redirection if needed
    navigate('/login');
  };

  const handleSignup = () => {
    // Perform any additional signup logic or redirection if needed
    navigate('/signup');
  };

  const handleLogout = () => {
    // Perform any additional logout logic or redirection if needed
    navigate('/');
  };

  return (
    <main className="App">
      <header>
        <Header
          isLoggedIn={!!user}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={handleLogout}
          user={user} setUser={setUser}
        />
      </header>
      <div className="layout">
        <div className="main-content">
          <LeftNav />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<PickUpGames />} />
              <Route path="/new" element={<CreateGame />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/update" element={<UpdateProfile profileUser={user} />} />
              <Route path="/games/:id" element={<GameDetails user={user} />} />
              <Route path="/login" element={<LoginForm setUser={setUser} />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/auth" element={<AuthPage setUser={setUser} />} />
              <Route path="/fields" element={<SoccerFields />} />
            </Routes>
          </div>
          <RightPanel user={user} />
        </div>
      </div>
    </main>
  );
}
