import React from 'react' 
import { Nav, Navbar } from "react-bootstrap"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  ForumIcon from '@material-ui/icons/Forum';
import '../css/admin-header.css'

export function AdminHeader() {
    return (
        <div className='admin-header'>
             <Navbar expand="lg">
                <Navbar.Brand href="/" id="navbar-brand">PS Constructions</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav">
                        <Nav.Link><ForumIcon />Messages</Nav.Link>
                        <Nav.Link href='/signin'><AccountCircleIcon />Logout</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}