import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Text, Nav, Li } from "./NavbarElem"
import axios from "axios";
import Replay from "../Replays";
import Replays from "../../pages/ReplayPage";
import TeamCreationForm from "../Coach/TeamCreationForm";

export const Navbar = () => {
    const [login, setlogin] = useState('Login');
    const [userloggedin, setuserloggedin] = useState(0);
    const [role, setRole] = useState();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("userdetails");
        if (JSON.parse(loggedInUser)) {
            setuserloggedin(1);
            const curruser = JSON.parse(loggedInUser);
            console.log(curruser);
            setRole(curruser.role.toLowerCase());
            setlogin(curruser.username);
        }
    }, []);
    const logout = () => {
        localStorage.clear();
        setuserloggedin(0);
        setRole('')
        setlogin('Login')
    }

    let adminextra = '<Li>HEllo ADMIN</Li>';
    return (
        <div>
            <Nav className="snav">
                <Li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></Li>
                <Li><Link to="/faq" style={{ textDecoration: 'none' }}>FAQs</Link></Li>
                <Li><Link to="/matches" style={{ textDecoration: 'none' }}>Matches</Link></Li>
                <Li><Link to="/contactus" style={{ textDecoration: 'none' }}>Contact Us</Link></Li>
                <Li><Link to="/aboutus" style={{ textDecoration: 'none' }}>About Us</Link></Li>
                <Li><Link to="/ticket" style={{ textDecoration: 'none' }}>Tickets</Link></Li>
                <Li><Link to="/replays" style={{ textDecoration: 'none' }}>Gallery</Link></Li>
                <Li><Link to="/search " style={{ textDecoration: 'none' }}>Search Matches</Link></Li>
                <Li><Link to='/managevolunteer' style={{ textDecoration: 'none' }}>Manage volunteer</Link></Li>
                {userloggedin ?
                    <button onClick={logout} style={{ textDecoration: 'none',border: 'none'}}>Logout {login}</button> :
                    <Li><Link to="/login" style={{ textDecoration: 'none' }}>{login}</Link></Li>
                }
                {role === 'admin' ? <Li><Link to='/admin' style={{ textDecoration: 'none' }}>Adminfunc</Link></Li> : null}
                {role === 'referee' || role == 'refree'? <Li><Link to='/refereedetails' style={{ textDecoration: null}}>Referee</Link></Li> : null}
                {role === 'volunteer' ? <Li><Link to='/volunteer' style={{ textDecoration: 'none' }}>Volunteer</Link></Li> : null}
                {role === 'volunteer manager' ? <Li><Link to='/managevolunteer' style={{ textDecoration: 'none' }}>Manage volunteer</Link></Li> : null}
                {role === 'coach' ? <Li><Link to='/coach' style={{ textDecoration: 'none', color: 'purple' }}> Coach </Link></Li> : null}
            </Nav>
        </div>
    )
}
