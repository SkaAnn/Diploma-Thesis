import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

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
            <Navbar className='navbar-light' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>DP-2021</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({history}) => <SearchBox history={history}/>} />

                        <Nav className="ml-auto">
                            {userInfo ? (
                                <>
                                    <LinkContainer to='/user/my/product/create'>
                                        <Nav.Link className='header-link mr-3'> <i className="fas fa-plus mr-1"></i> Pridaj produkt</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/user/my/favorites'>
                                        <Nav.Link className='header-link mr-3'> <i className="far fa-heart mr-1"></i> Obľúbené produkty</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={`/user/my/profile`}>
                                        <Nav.Link className='header-link mr-3'> <i className="far fa-smile-beam mr-1"></i> Môj Profil</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown className='header-link' title={userInfo.name} id='username'>
                                        <NavDropdown.Item onClick={logoutHandler}> <span className='header-link'> Odhlásiť sa </span></NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link className='header-button pad-9px'><i className='fas fa-user mr-1' /> Prihlásiť sa</Nav.Link>
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
