import { Nav, Navbar } from "react-bootstrap";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Wave } from 'react-animated-text'
import "../css/header.css";

function Header () {
    const path = document.location.pathname
    console.log(path);
    return(
        <Navbar expand="lg">
        <Navbar.Brand href="/" id="navbar-brand" >
        <Wave text="PS CONSTRUCTIONS" effect={"verticalFadeIn"} iterations={1}  effectChange={2.0}  effectDuration={0.5}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
                <Nav.Link href="/" id={path==="/"?"nav-Link":null}>Home</Nav.Link>
                <Nav.Link href="/plans" id={path==="/plans"?"nav-Link":null}>Our Plans</Nav.Link>
                <Nav.Link href="/contactus" id={path==="/contactus"?"nav-Link":null}>Contact Us</Nav.Link>
                <Nav.Link href="/about" id={path==="/about"?"nav-Link":null}>About</Nav.Link>
                <Nav.Link href='/signin' id={path==="/signin"?"nav-Link":null}><AccountCircleIcon />Sign In</Nav.Link>
            </Nav>
            
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;