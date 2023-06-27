import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { logOut } from '../../utilities/users-service';
import './Header.css';

export default function Header() {
  const location = useLocation();

  const handleLogout = () => {
    logOut();
    // Perform any additional logout logic or redirection if needed
  };

  const isLoggedIn = false; // Replace with your login check logic

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="title">
          PickUpPro
        </Link>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="header-button">
            Log Out
          </button>
        ) : (
          <>
            {location.pathname !== '/login' && (
              <Link to="/login" className="header-button">
                Login
              </Link>
            )}
            {location.pathname !== '/signup' && (
              <Link to="/signup" className="header-button">
                Sign Up
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
