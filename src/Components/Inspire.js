import '../css/inspire.css';
import { useState } from 'react';
import { Button, Card, Carousel, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function App() {
  const [radioValue, setRadioValue] = useState('1');
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const radios = [
    { name: 'Bed Room', value: '1' },
    { name: 'Kitchen', value: '2' },
    { name: 'Living Room', value: '3' },

  ];
  return (
    <Container fluid>
      {/* navbar */}
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
              <img src='img/cart-dark.svg' alt='cart' width={'25px'} />
              <div className='cart-point'>
                <p>0</p>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* body */}
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="auto"><h3 className='text-dark mt-5'>空間靈感</h3></Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={4}>
            <ButtonGroup className='w-100'>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        {/* carousell */}
      </Container>
      <Container fluid className='position-absolute bottom-0'>
        <Row className='mt-4 mb-5'>
          <Carousel
            className='mb-0'
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
            indicators={false}
            interval={null}
            wrap={false}
            nextIcon={<img src='img/arrow-right.svg' alt='arrow-right' width={'100px'} />}
            prevIcon={<img src='img/arrow-left.svg' alt='arrow-left' width={'100px'} />}
          >
            <Carousel.Item>
              <canvas class="webgl"></canvas>
            </Carousel.Item>
            <Carousel.Item>

            </Carousel.Item>
            <Carousel.Item>

            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>

    </Container>

  );
}

export default App;
