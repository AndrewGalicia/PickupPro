import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LeftNav from '../../components/LeftNav/LeftNav';
import RightPanel from '../../components/RightPanel/RightPanel';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <header className="header"><Header/></header>
      <div className="layout">
        {/* <header className="header">header goes here</header> */}
        <div className="main-content">
          <nav className="left-nav"><LeftNav/></nav>
          <div className="front-page-content">front page content goes here</div>
          <aside className="right-panel"><RightPanel/></aside>
        </div>
      </div>
      <footer className="footer"><Footer/></footer>
    </main>
  );
}
