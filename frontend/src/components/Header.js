import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

// #3f51b5
// https://bootsnipp.com/snippets/mMynR
const Header = () => {
    return (
        <header>
            <Navbar className='navbar-dark indigo' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">DP-2021</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/login"><i className='fas fa-user' /> &nbsp; Prihlásiť sa</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
