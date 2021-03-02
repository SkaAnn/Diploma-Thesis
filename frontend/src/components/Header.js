import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

// #3f51b5
// https://bootsnipp.com/snippets/mMynR
const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        // DISPATCH LOGOUT
        dispatch(logout())
    }

    return (
        <header>
            <Navbar className='navbar-dark indigo' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>DP-2021</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">


                            {userInfo ? (
                                <>
                                    <LinkContainer to='/my/product/create'>
                                        <Nav.Link>Pridaj produkt</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to={`/user/${userInfo._id}/profile`}>
                                            <NavDropdown.Item>Profil</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Odhlásiť sa</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className='fas fa-user' />  Prihlásiť sa</Nav.Link>
                                    </LinkContainer>
                                )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header
