import { Link } from 'react-router-dom';

export default function Toggle() {
    return (
        <nav className='left-nav'>
            <Link to="/new"> PickUp Time!</Link>
            <Link to="/"> Find a Game </Link>
            <Link to="/profile"> Profile</Link>
        </nav>
    )
}
