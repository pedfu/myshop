import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <LinkContainer to="/" className='navbar-brand'>
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <LinkContainer to="/cart" className='nav-link'>
                  <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/login" className='nav-link'>
                  <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                </LinkContainer>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
