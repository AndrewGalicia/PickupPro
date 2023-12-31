import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <br /> <br /> <br /> <br />
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
      <div className='Auth-Top'>
        <button className="classic-button" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Already have an account? Log In Here!' : 'No Account? Sign Up Here!'}</button>
      </div>
    </main>
  );
}