import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './LeftNav.css'
export default function LeftNav() {
    return (
        <nav className='left-nav'>
            <Link to="/new" className='special'> PickUp Time!</Link>
            <Link to="/"> Find a Game </Link>
            <Link to="/fields"> Soccer Field </Link>
            <Link to="/profile"> Profile</Link>
        </nav>
    )
}

