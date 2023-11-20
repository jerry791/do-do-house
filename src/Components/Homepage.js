import '../css/homepage.css';
import { Button, Container, Row, Col, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
function App() {
  return (
    <Container fluid className='bgImg'>
      {/* navbar */}
      <Navbar bg="transparent" data-bs-theme="dark">
        <Navbar.Brand href="/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Container fluid className="justify-content-center ps-0">
          <Nav activeKey="/Home">
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
            {/* <Nav.Item>
              <Nav.Link eventKey="disabled" disabled className='me-5'>
                Disabled
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Container>
      </Navbar>
      {/* body */}
      <Container className='mt-5'>
        <Row className="justify-content-md-center">
          <Col md="auto"><h1 className='text-light'>您的房間將變得</h1></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto"><h1 className='text-light'>簡約 和 現代</h1></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto"><p className='text-light'>啟發你的空間靈感</p></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto"><p className='text-light'>家具布置將變得更加極簡和現代</p></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={3}>
            <Button variant="opacity w-100 mt-5" href='/Shop'><p className='text-light'>Let's Started !</p></Button>
          </Col>
        </Row>
      </Container>
    </Container>

  );
}

export default App;
