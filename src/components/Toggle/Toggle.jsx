import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function Toggle() {
    return (
        <nav className='left-nav'>
            <Link to="/new"> PickUp Time!</Link>
            <Link to="/"> Find a Game </Link>
            <Link to="/profile"> Profile</Link>
        </nav>
    )
}
