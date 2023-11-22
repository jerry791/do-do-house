import '../css/inspire.css';
import { Button, Container, Row, Col, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
function App() {
  return (
    <Container fluid>
      <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
        <Navbar.Brand href="/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Nav activeKey="/Inspire">
          <Nav.Item >
            <Nav.Link href="/Home" className='me-5'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Shop" className='me-5'>Shop</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Inspire" className='me-5'>Inspire</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Contact us" className='me-5'>Contact us</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/Cart">
              <img src='img/cart-dark.svg'  alt='cart' width={'25px'}/> 
              <div className='cart-point'>
                <p>0</p>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Container>

  );
}

export default App;
