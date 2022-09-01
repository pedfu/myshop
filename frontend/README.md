<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MYSHOP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">          
            <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
        </li>
        <li class="nav-item">
          <LinkContainer to="/login">
                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
              </LinkContainer>
        </li>
      </ul>
    </div>
  </div>
</nav>

<Navbar className='navbar navbar-expand-md' bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ml-auto">
            <Nav className='mr-auto'>
              <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container className=''>
        <div className="container-fluid px-0">
          <LinkContainer to="/" className='navbar-brand'>
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">          
                  <LinkContainer to="/cart">
                      <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                  </LinkContainer>
              </li>
              <li class="nav-item">
                <LinkContainer to="/login">
                      <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                    </LinkContainer>
              </li>
            </ul>
          </div>
        </div>
        </Container>
      </nav>            



      <nav className='navbar bg-dark navbar-dark'>
        <LinkContainer to="/">
          <h2 className='navbar-brand'>MYSHOP</h2>
        </LinkContainer>



        <div className='d-flex'>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className='nav-item'>Teste</li>
              <li className='nav-item'>Teste</li>
            </ul>
          </div>          
        </div>
      </nav>