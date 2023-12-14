import '../css/shop.css';
import { useState, useCallback } from 'react';
import { Button, Card, Carousel, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import Product from './Product';
import { useNavigate } from "react-router-dom";
function App() {
  const [radioValue, setRadioValue] = useState('1');
  const [index, setIndex] = useState(0);
  const [view_types, changeView] = useState('Chair');
  // const [count, setCount] = useState(0);
  const [targetProduct, saveTargetProduct] = useState('');
  const navigate = useNavigate()
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const preprocess=(product_list)=> {
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
    { name: 'Table', value: '2'},
    { name: 'Bed', value: '3' },
    { name: 'Cabinet', value: '4' },
    { name: 'Lamp', value: '5' },
    { name: 'Utensil', value: '6'},

  ];

  const products_raw = [
    { id: 1, name: '風格獨特椅', price: 392, type: 'Chair',url:'https://drive.google.com/uc?export=view&id=1bFNEeaMZ9Yg2O8Wcsy-cn2t6Z301mBLg' },
    { id: 2, name: '環保時尚椅', price: 392, type: 'Chair',url:'https://drive.google.com/uc?export=view&id=1C5B0ZcMKHieanXkH3WSAHQcT5Hj6X_tz' },
    { id: 3, name: '輕便折疊露天椅', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1oMt4KQMvw9Pr2WKVaz51djMU1Df5Kmaw'},
    { id: 4, name: '經典風格藝術椅', price: 391, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1XOzYwod-nC1qFP0l8jcuAB5zq7PGl9K8'},
    { id: 5, name: '現代簡約嬰兒椅', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1Zb_5fOxpYTV1t6tqPZ3iqi4hWzDA-jjI'},
    { id: 6, name: '絲滑布面沙發', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1aUJi8C7bYG77DJe6Cuh9uZFJk7lwANJw'},
    { id: 7, name: '日式木椅', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1TBEcug1CvMdXMRbRmKcDrBZXQS5SFdje'},
    { id: 8, name: '舒適靈動座椅', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=12mGXyj98r9oayDjJV5cuFZlP6S8rrpY2'},
    { id: 9, name: 'L型酷沙發', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1nJQE8JoLX6p_nqwTu8V4p61jbAAQuIPU'},
    { id: 10, name: '現代居家床組', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1DCIsu1Ce4tLLAWDeGtKBS8n0W6MD_wuC'},
    { id: 11, name: '歐式床組', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1_gcubStGtfajnsOAotNBYmGhthrpZllh'},
    { id: 12, name: '現代日式床組', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1BbVa_RfSB2yo97yIHLB330ZAhe03IAYh'},
    { id: 13, name: '美式木頭桌', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1AiJY1jqZV-X3e6qGH31Wn-XdL8S2miMF'},
    { id: 14, name: '黝黑玻璃桌', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1xRwmfp7dgt4J_76RKLfsQ1Pklmk1rhOA'},
    { id: 15, name: '中島廚房桌', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1gTz3YnxeZnsIw9Egi2oUZmoj4olrOKaQ'},
    { id: 16, name: '清新小櫥櫃', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1ef6e-kmnvGfjnd9OW1734vhxVOyzFyRP'},
    { id: 17, name: '布質收納櫃', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1mz1rs-OaE32z7d_Tl3frECTJWVPHl3ut'},
    { id: 18, name: '簡約居家櫃', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=13rl4_o-UZCmOk8ma2XB66GuwD9u3XKhD'},
    { id: 19, name: '舒眠床頭櫃', price: 391, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1ehwxM7ID4zqhXNWuQg_JsHy7gTKCChub'},
    { id: 20, name: '晚安小夜燈', price: 392, type: 'Lamp',url: 'https://drive.google.com/uc?export=view&id=1MxsosRnE9c2MyOyrUV7q5ghInFk-JOZw'},
    { id: 21, name: '藝術長燈', price: 392, type: 'Lamp',url: 'https://drive.google.com/uc?export=view&id=1BQqymnlWQH1iqmUSlgI8B0xGG4b81Vql'},
    { id: 22, name: '歐式碗盤架', price: 392, type: 'Utensil',url: 'https://drive.google.com/uc?export=view&id=1gVfGoJRerAEAvkyAatexadSJilwqXEnU'},
    { id: 23, name: '大理石洗手台', price: 392, type: 'Utensil',url: 'https://drive.google.com/uc?export=view&id=1WpUNak5UZzHNyn9wm6CkstpSi4Qkaubr'}
  ];
  let products = preprocess(products_raw)

  const sendProductName = (name) => {
    navigate( `/do-do-house/Product?productName=${name}`);
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
                      <Card style={{zIndex:100}} >
                        <Card.Img onClick={()=>{sendProductName(product.name)}} style={{objectFit:'contain'}} variant="top" 
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
                              <Button onClick={()=>{console.log('click')}} variant="blue" className='px-2 pt-2 pb-0 rounded-circle'>
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
