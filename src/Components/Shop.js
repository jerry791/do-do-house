import '../css/shop.css';
import { useState } from 'react';
import { Button, Card, Carousel, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
function App() {
  const [radioValue, setRadioValue] = useState('1');
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
function preprocess(product_list){
  const products = [];
  const groupSize = 4;

  for (let i = 0; i < products_raw.length; i += groupSize) {
    const group = products_raw.slice(i, i + groupSize);
    products.push(group);
  }
  return products
}
  const radios = [
    { name: 'Chair', value: '1' },
    { name: 'Bed', value: '2' },
    { name: 'Sofa', value: '3' },
    { name: 'Lamp', value: '4' },
  ];

  const products_raw = [
    { id: 1, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 2, name: 'Baltsar Chair', price: 392, type: 'Chair' },
    { id: 3, name: 'Anjay Chair', price: 392, type: 'Chair' },
    { id: 4, name: 'Nyantuy Chair', price: 391, type: 'Chair' },
    { id: 5, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 6, name: 'Baltsar Chair', price: 392, type: 'Chair' },
    { id: 5, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 6, name: 'Baltsar Chair', price: 392, type: 'Chair' },
    { id: 5, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 6, name: 'Baltsar Chair', price: 392, type: 'Chair' }
  ];
  const products=preprocess(products_raw)
  return (
    <Container fluid>
      {/* navbar */}
      <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
        <Navbar.Brand href="/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Nav activeKey="/Shop">
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
          <Col md="auto"><h3 className='text-dark mt-5'>商品總覽</h3></Col>
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
      {/* 商品列表 */}
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
            {
              products.map((products) => (
                <Carousel.Item>
                  <div className='card-warpper'>
                    {products.map((product) => (
                      <Card>
                        <Card.Img variant="top" src={`img/chair${product.id}.png`} />
                        <Card.Body>
                          <Card.Title>{product.type}</Card.Title>
                          <Card.Text>
                            {product.name}
                          </Card.Text>
                          <Row className='mt-5 align-items-center'>
                            <Col>
                              <Card.Text>
                                {`$${product.price}`}
                              </Card.Text>
                            </Col>
                            <Col md={2} className='ps-0 pe-0'>
                              <Button variant="blue" className='px-2 pt-2 pb-0 rounded-circle' href='#'>
                                <img src='img/plus.svg' className='add-icon' />
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </Row>
      </Container>
    </Container>

  );
}

export default App;
