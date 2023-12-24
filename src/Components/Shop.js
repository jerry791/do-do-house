import '../css/shop.css';
import { useState, useEffect } from 'react';
import { Button, Card, Carousel, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import IP_Path from './IP';
import { useNavigate } from "react-router-dom";
import ChatBot from './ChatBot';
function App() {
  const [radioValue, setRadioValue] = useState('1');
  const [index, setIndex] = useState(0);
  const [view_types, changeView] = useState('Chair');
  // const [count, setCount] = useState(0);
  const [products,set_products_data]=useState([[]]);
  //設定cart
  const [cartNum, setCartNum]=useState(0);
  const [triggerer, triggerCartUpdate]=useState(true);
  const navigate = useNavigate()
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const preprocess = (product_list) => {
    const products = [];
    const groupSize = 4;
    // 篩選type
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
    { name: 'Table', value: '2' },
    { name: 'Bed', value: '3' },
    { name: 'Cabinet', value: '4' },
    { name: 'Lamp', value: '5' },
    { name: 'Utensil', value: '6' },
  ];
  useEffect(()=>{
    var data = {};//get all data
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    // product:找特定商品
    var path = IP_Path + "product"; 
    fetch(path, {
      method: "POST",
      headers: headers,
      // mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      var valuesArray = Object.values(jsonData);
      set_products_data(preprocess(Object.values(jsonData)))
    })
  },[view_types])

  useEffect(()=>{
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
      if(jsonData.result=='empty'){
        setCartNum(0)
      }else{
        setCartNum((Object.values(jsonData)).length)
      }
    })
  },[triggerer])

  useEffect(() => {
    // Add the 'animate' class for 2 seconds when cartNum changes
    const cartPointElement = document.querySelector('.cart-point');
    if (cartPointElement) {
      cartPointElement.classList.add('animate');
      setTimeout(() => {
        cartPointElement.classList.remove('animate');
      }, 2000);
    }
  }, [cartNum]);

  const addToCart =(ProductName,Amount)=>{
    var data = {
      name:ProductName,
      amount:Amount
    };//get all data
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
      console.log(jsonData)
      triggerCartUpdate(!triggerer)
    })
  }

  const sendProductName = (name) => {
    navigate(`/do-do-house/Product?productName=${name}`);
  };

  
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
          {/* <Nav.Item>
            <Nav.Link href="/do-do-house/Contact us" className='me-5'>Contact us</Nav.Link>
          </Nav.Item> */}
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/do-do-house/Cart">
              <img src='img/cart-dark.svg' alt='cart' width={'25px'} />
              <div className='cart-point'>
                <p>{cartNum}</p>
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
      <Container fluid className='position-absolute bottom-0 right-0 left-0'>
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
                    {products.map((product, idx) => (
                      <Card style={{ zIndex: 100 }} >
                        <Card.Img onClick={() => { sendProductName(product.name) }} style={{ objectFit: 'contain' }} variant="top"
                          src={`${product.url}`}
                        />
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
                              <Button onClick={() => { addToCart(product.name,1)}} variant="blue" className='px-2 pt-2 pb-0 rounded-circle'>
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
      <ChatBot/>
    </Container>

  );
}

export default App;
