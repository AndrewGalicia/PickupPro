import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './Header.css';

export default function Header({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <header className='header'>
      <div className="header-left">
        <Link to="/" className="title">
//           PickUpPro
//         </Link>
      </div>
      <div className='header-right'>
      { user ?
          <>
            <span>Welcome, {user.username}...</span>
            <p><Link className="header-button" to="" onClick={handleLogOut}>Log Out</Link></p>
          </>
          :
          <Link className="header-button" to="/auth"> Login/SignUp </Link>
      }
      </div>
    </header>
  )
}

