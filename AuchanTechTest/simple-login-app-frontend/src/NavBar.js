import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li className="align-left">
                    <Link to="/">Home</Link>
                </li>
                <li className="align-right">
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/weather">Weather</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;