import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'
export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <div className="Auth-Top">
        {/* <h1 className="Auth-h1">AuthPage</h1> */}
      
     
      </div>
      <br /><br /> <br /> <br />
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
      <div className='Auth-Top'>

      
      <button className="classic-button" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'No Account? Sign Up Here!'}</button>
      </div>
    </main>
  );
}