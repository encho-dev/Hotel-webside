import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
    return(
    <div>
        <nav className="nav-container">
        <ul>
            <li>
                <Link to="/addhotelrooms"> Add Hotel Rooms</Link>
            </li>
            <li>
                <Link to="/hotels"> Hotel Rooms</Link>
            </li>
        </ul> 
        </nav>
    </div>
    );
};

export default Nav;