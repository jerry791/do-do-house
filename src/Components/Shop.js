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
    { id: 1, name: '風格獨特椅',description: '獨具風格的椅子，設計獨特，展現簡約奢華。舒適座椅，完美搭配各種空間。為您的家居帶來時尚與舒適。', price: 392, type: 'Chair',url:'https://drive.google.com/uc?export=view&id=1bFNEeaMZ9Yg2O8Wcsy-cn2t6Z301mBLg' },
    { id: 2, name: '環保時尚椅',description: '環保設計的時尚椅，以可持續素材製成。簡約外觀，為您的空間增添現代感。環保生活，由家具開始。', price: 392, type: 'Chair',url:'https://drive.google.com/uc?export=view&id=1C5B0ZcMKHieanXkH3WSAHQcT5Hj6X_tz' },
    { id: 3, name: '輕便城市露天椅',description: '輕巧時尚的城市露天椅，設計便攜。適合城市生活，隨時為您帶來休憩與悠閒。城市輕生活，由此椅開始。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1oMt4KQMvw9Pr2WKVaz51djMU1Df5Kmaw'},
    { id: 4, name: '經典風格藝術椅',description: '經典風格的藝術椅，注入藝術氛圍。優雅造型，展現品味。打造優雅空間，感受藝術的氛圍。', price: 391, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1XOzYwod-nC1qFP0l8jcuAB5zq7PGl9K8'},
    { id: 5, name: '現代簡約嬰兒椅',description: '現代簡約風格的嬰兒椅，專為小天使而設。安全可靠，柔軟舒適，為寶寶提供最愉快的坐姿。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1Zb_5fOxpYTV1t6tqPZ3iqi4hWzDA-jjI'},
    { id: 6, name: '絲滑布面沙發',description: '細緻絲滑的布面沙發椅，觸感舒適。簡約設計，為您的家居增添溫馨感。沉浸於柔軟的懷抱。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1aUJi8C7bYG77DJe6Cuh9uZFJk7lwANJw'},
    { id: 7, name: '日式木椅',description: '日式風格的木椅，簡約而典雅。天然木質，散發淡雅氣息。融入日本美學，創造寧靜空間。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1TBEcug1CvMdXMRbRmKcDrBZXQS5SFdje'},
    { id: 8, name: '舒適靈動座椅',description: '舒適靈動的座椅，為您提供極致的休閒體驗。靈活設計，適應不同坐姿。放鬆身心，盡享舒適時光。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=12mGXyj98r9oayDjJV5cuFZlP6S8rrpY2'},
    { id: 9, name: 'L型酷沙發',description: '獨特L型設計的酷沙發，風格十足。寬大座椅，讓您盡情舒適。打造時尚休憩區，展現個性魅力。', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1nJQE8JoLX6p_nqwTu8V4p61jbAAQuIPU'},
    { id: 10, name: '現代居家床組',description: '時尚現代的居家床組，簡約而不失溫馨。舒適寢具，打造夢幻臥室空間。品味生活，從床開始。', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1DCIsu1Ce4tLLAWDeGtKBS8n0W6MD_wuC'},
    { id: 11, name: '歐式床組',description: '歐式風格的床組，融入經典與奢華。精緻雕花，展現尊貴氛圍。在夢中感受歐洲皇室的奢華與浪漫。', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1_gcubStGtfajnsOAotNBYmGhthrpZllh'},
    { id: 12, name: '現代日式床組',description:'現代風格與日本美學相結合的床組，低調而富有品味。榻榻米設計，營造寧靜空間。品味生活，享受寧靜夜晚。', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1BbVa_RfSB2yo97yIHLB330ZAhe03IAYh'},
    { id: 13, name: '美式木頭桌',description:'美式風格的木頭桌，質樸自然。細膩木紋，營造溫馨用餐氛圍。家的溫暖，從美式木頭桌開始。', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1AiJY1jqZV-X3e6qGH31Wn-XdL8S2miMF'},
    { id: 14, name: '黝黑玻璃桌',description:'黝黑玻璃打造的時尚桌面，簡約現代。質感玻璃，營造空間通透感。品味生活，享受時尚用餐體驗。', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1xRwmfp7dgt4J_76RKLfsQ1Pklmk1rhOA'},
    { id: 15, name: '中島廚房桌',description:'中島設計的廚房桌，實用兼具美感。多功能櫃體，打造整潔廚房空間。簡約設計，提升廚房風格。', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1gTz3YnxeZnsIw9Egi2oUZmoj4olrOKaQ'},
    { id: 16, name: '清新小櫥櫃',description:'清新風格的小櫥櫃，為空間增添輕盈氛圍。巧妙收納，營造整潔居家。清新小櫥櫃，點綴生活美好。', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1ef6e-kmnvGfjnd9OW1734vhxVOyzFyRP'},
    { id: 17, name: '布質收納櫃',description:'以布質打造的收納櫃，柔軟質感。巧妙利用空間，滿足收納需求。簡約風格，為居家添上美好風采。', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1mz1rs-OaE32z7d_Tl3frECTJWVPHl3ut'},
    { id: 18, name: '簡約居家櫃',description:'簡約風格的居家櫃，線条俐落。實用收納，營造整潔空間。簡約生活，從簡約居家櫃開始。', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=13rl4_o-UZCmOk8ma2XB66GuwD9u3XKhD'},
    { id: 19, name: '舒眠床頭櫃',description:'專為舒適而設計的床頭櫃，貼心收納。簡約外觀，與床組相得益彰。夜晚的好伴侶，舒眠床頭櫃。', price: 391, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1ehwxM7ID4zqhXNWuQg_JsHy7gTKCChub'},
    { id: 20, name: '晚安小夜燈',description:'溫暖的光芒，伴您入夢。晚安小夜燈，簡約設計，創造溫馨氛圍。夢幻之光，將甜美的夜晚延續。', price: 392, type: 'Lamp',url: 'https://drive.google.com/uc?export=view&id=1MxsosRnE9c2MyOyrUV7q5ghInFk-JOZw'},
    { id: 21, name: '藝術長燈',description:'融入藝術氛圍的長燈，線條優雅。不僅照亮空間，更是精緻藝術品。賦予家居更多藝術與品味。', price: 392, type: 'Lamp',url: 'https://drive.google.com/uc?export=view&id=1BQqymnlWQH1iqmUSlgI8B0xGG4b81Vql'},
    { id: 22, name: '歐式碗盤架',description:'歐式風格的碗盤架，線條優雅。巧妙收納，展示廚房精緻。歐陸風情，從碗盤架開啟。', price: 392, type: 'Utensil',url: 'https://drive.google.com/uc?export=view&id=1gVfGoJRerAEAvkyAatexadSJilwqXEnU'},
    { id: 23, name: '大理石洗手台',description:'大理石打造的洗手台，奢華典雅。質感獨特，為廚房帶來高雅氛圍。享受每一次洗手的奢華體驗。', price: 392, type: 'Utensil',url: 'https://drive.google.com/uc?export=view&id=1WpUNak5UZzHNyn9wm6CkstpSi4Qkaubr'}
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
