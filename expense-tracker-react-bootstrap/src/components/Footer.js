import React from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";

// Todo: Fix the footer with a better looking
const Footer = () => {
    const navbarMenuItems = [
        { text: 'Home', link: '/', key: 'home' },
        { text: 'About', link: '/about', key: 'about' },
        { text: 'Support', link: '/support', key: 'support' },
        { text: 'Summary', link: '/summary', key: 'summary' },
    ];

    return (
        <>
            <footer className="border-top position-absolute fixed-bottom w-100">
                <Container fluid>
                    <Row className="d-flex flex-wrap justify-content-between align-items-center">
                        <Col md={4} className="mt-0 text-muted">© 2023 Budget Buddy</Col>
                        <Col md={4} className="nav justify-content-end">
                            <Nav className="me-auto">
                                {navbarMenuItems.map(item => <Nav.Link href={item.link} key={item.key}>{item.text}</Nav.Link>)  }
                                {/*{navbarMenuItems.map((item) => (*/}
                                {/*    <Nav.Link href={item.link} key={item.key}>{item.text}</Nav.Link>*/}
                                {/*))*/}
                                {/*}*/}
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;