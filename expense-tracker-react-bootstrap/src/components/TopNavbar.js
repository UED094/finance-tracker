import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import appLogo from "../assets/images/finance_logo.png";

// TODO: Make the navbar fixed top and create spacing
const TopNavbar = () => {
    const navbarMenuItems = [
        { text: 'Home', link: '/', key: 'home'},
        { text: 'About', link: '/about', key: 'about'},
        { text: 'Support', link: '/support', key: 'support'},
        { text: 'Summary', link: '/summary', key: 'summary'},
        { text: 'Categories', link: '/categories', key: 'categories'}
    ]

    return (

        <>
            <Navbar bg="dark"  expand={"sm"} data-bs-theme="dark" >
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            alt="finance logo"
                            src={appLogo}
                            width="30"
                            height="24"
                            className="d-inline-block align-top"
                        />{' '}
                        Expense Tracker
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {navbarMenuItems.map(item => <Nav.Link href={item.link} key={item.key}>{item.text}</Nav.Link>)  }
                            {/*{navbarMenuItems.map((item) => (*/}
                            {/*    <Nav.Link href={item.link} key={item.key}>{item.text}</Nav.Link>*/}
                            {/*))*/}
                            {/*}*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
};

export default TopNavbar;