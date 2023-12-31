import '../css/homepage.css';
import { useState, useEffect } from 'react';
import IP_Path from './IP';
import { Button, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import ChatBot from './ChatBot';
function App() {
  //設定cart
  const [cartNum, setCartNum] = useState(0);
  useEffect(() => {
    var data = {};//get all data
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    // product:找特定商品
    var path = IP_Path + "cart";
    fetch(path, {
      method: "POST",
      headers: headers,
      // mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      if (jsonData.result === 'empty') {
        setCartNum(0)
      } else {
        setCartNum((Object.values(jsonData)).length)
      }
    })
  }, [])
  return (
    <Container fluid className='bgImg'>
      {/* navbar */}
      <Navbar bg="transparent" data-bs-theme="dark" className='justify-content-around'>
        <Navbar.Brand href="/do-do-house/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Nav activeKey="/do-do-house/Home">
          <Nav.Item >
            <Nav.Link href="/do-do-house/Home" className='me-5'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Shop" className='me-5'>Shop</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Inspire" className='me-5'>Inspire</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link href="/do-do-house/Contact us" className='me-5'>Contact us</Nav.Link>
          </Nav.Item> */}
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Cart">
              <img src='img/cart-fill.svg' alt='cart' width={'25px'} />
              <div className='cart-point'>
                <p>{cartNum}</p>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* body */}
      <Container className='mt-5'>
        <Row className="justify-content-md-center">
          <Col md="auto"><h1 className='text-light'>您的房間將變得</h1></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto"><h1 className='text-light'>簡約 和 現代</h1></Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col md="auto"><h2 className='text-light'>啟發你的空間靈感</h2></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto"><h2 className='text-light'>家具布置將變得更加極簡和現代</h2></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={3}>
            <Button variant="opacity w-100 mt-3" href='/do-do-house/Shop'><p className='text-light' style={{ fontSize: '24px' }}>Let's Started !</p></Button>
          </Col>
        </Row>
      </Container>
      <ChatBot />
    </Container>

  );
}

export default App;
