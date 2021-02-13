import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { modelLogout } from '../actions/modelActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const modelLogin = useSelector((state) => state.modelLogin);
  const { modelInfo } = modelLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const modelLogoutHandler = () => {
    dispatch(modelLogout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href='/'>DinnerWithModels</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : modelInfo ? (
                <NavDropdown title={modelInfo.username} id='username'>
                  <LinkContainer to='/profile/model'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={modelLogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/modellist'>
                    <NavDropdown.Item>Models</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/plans'>
                    <NavDropdown.Item>Plans</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/verifyTransaction'>
                    <NavDropdown.Item>Verify Transaction</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/carousel'>
                    <NavDropdown.Item>Home Carousels</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to='admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
