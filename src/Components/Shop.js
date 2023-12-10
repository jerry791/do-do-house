import '../css/shop.css';
import { useState } from 'react';
import { Button, Card, Carousel, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import Product from './Product';
function App() {
  const [radioValue, setRadioValue] = useState('1');
  const [index, setIndex] = useState(0);
  const [view_types, changeView] = useState('Chair');
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  function preprocess(product_list) {
    const products = [];
    const groupSize = 4;
    // 篩選type
    console.log(view_types)
    const product_list_filter = product_list.filter(product => product.type === view_types);
    //根據groupSize拆解
    for (let i = 0; i < product_list_filter.length; i += groupSize) {
      const group = product_list_filter.slice(i, i + groupSize);
      products.push(group);
    }
    return products
  }

  const radios = [
    { name: 'Chair', value: '1' },
    { name: 'Table', value: '2'},
    { name: 'Bed', value: '3' },
    { name: 'cabinet', value: '4' },
    { name: 'Lamp', value: '5' },
    { name: 'utensil', value: '6'},

  ];

  const products_raw = [
    { id: 1, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 2, name: 'Baltsar Chair', price: 392, type: 'Chair' },
    { id: 3, name: 'Anjay Chair', price: 392, type: 'Chair' },
    { id: 4, name: 'Nyantuy Chair', price: 391, type: 'Chair' },
    { id: 5, name: 'Sakarias Armchair', price: 392, type: 'Chair' },
    { id: 6, name: 'Baltsar Chair', price: 392, type: 'Chair' },
    { id: 7, name: 'Sakaria bed', price: 392, type: 'Bed' },
    { id: 8, name: 'Baltsar bed', price: 392, type: 'Bed' },
    { id: 9, name: 'Sakarias bed', price: 392, type: 'Bed' },
    { id: 10, name: 'Baltsar bed', price: 392, type: 'Bed' }
  ];
  let products = preprocess(products_raw)
  return (
    <Container fluid>
      {/* navbar */}
      <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
        <Navbar.Brand href="/do-do-house/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Nav activeKey="/do-do-house/Shop">
          <Nav.Item >
            <Nav.Link href="/do-do-house/Home" className='me-5'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Shop" className='me-5'>Shop</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Inspire" className='me-5'>Inspire</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Contact us" className='me-5'>Contact us</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Cart">
              <img src='img/cart-dark.svg' alt='cart' width={'25px'} />
              <div className='cart-point'>
                <p>0</p>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* body */}
      <Container fluid className='mb-4'>
        <Row className="justify-content-md-center">
          <Col md="auto"><h3 className='text-dark mt-5'>商品總覽</h3></Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
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
                  onChange={(e) => {
                    changeView(radio.name)
                    setRadioValue(e.currentTarget.value)
                  }}
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
        <Row className='mb-5'>
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
                    {products.map((product,idx) => (
                      <Card>
                        <Card.Img variant="top" src={`img/${product.type}${idx}.png`} />
                        <Card.Body>
                          <Row width={'100%'}>
                            <Card.Title>{product.type}</Card.Title>
                            <Card.Text>
                              {product.name}
                            </Card.Text>
                          </Row>
                          <Row className='align-items-center'>
                            <Col className='ps-0 pe-0'>
                              <Card.Text>
                                {`$${product.price}`}
                              </Card.Text>
                            </Col>
                            <Col md={2} className='ps-0 pe-0'>
                              <Button variant="blue" className='px-2 pt-2 pb-0 rounded-circle' onClick={<Product productName={product.name} href="#" />}>
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
