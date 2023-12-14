import '../css/inspire.css';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
// React 组件
const Lights_bedroom = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <hemisphereLight intensity={8} />
    </>
  );
};

const Lights_kitchen = () => {
  return (
    <>
      <ambientLight intensity={1} />

    </>
  );
};

const Lights_livingRoom = () => {
  return (
    <>
      <ambientLight intensity={2} />
    </>
  );
};
const BedRoom = () => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  const modelPositionRef = useRef({ x: 0, y: -2, z: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [cardIsVisible, setCardVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  const products_raw = [
    { id: 18, name: '簡約居家櫃', price: 392, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=13rl4_o-UZCmOk8ma2XB66GuwD9u3XKhD'},
    { id: 19, name: '舒眠床頭櫃', price: 391, type: 'Cabinet',url: 'https://drive.google.com/uc?export=view&id=1ehwxM7ID4zqhXNWuQg_JsHy7gTKCChub'},
    { id: 12, name: '現代日式床組', price: 392, type: 'Bed',url: 'https://drive.google.com/uc?export=view&id=1BbVa_RfSB2yo97yIHLB330ZAhe03IAYh'},
  ]
  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      'model/reality_room_edited/bedRoom3.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(modelPositionRef.current.x, modelPositionRef.current.y, modelPositionRef.current.z);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleCamera = (X, Y, Z) => {
    gsap.to(cameraRef.current.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const handlePosition = (X, Y, Z) => {
    gsap.to(model.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const goToIni = () => {
    gsap.to(cameraRef.current.position, {
      x: 16,
      y: 6,
      z: 16,
      duration: 1.5,
    });
    gsap.to(model.position, {
      x: modelPositionRef.current.x,
      y: modelPositionRef.current.y, // Set your desired initial y position
      z: modelPositionRef.current.z, // Set your desired initial z position
      duration: 1.5,
    });
    setIsVisible(true)
    setCardVisible(false)
  };
  // 點擊事件處理程序，將 isVisible 設置為 false，隱藏所有按鈕
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  //處理卡片
  const handleCard = (bool) => {
    setCardVisible(bool)
  }
  const filterProducts = (id) => {
    setProduct(products_raw.filter(product => product.id === id)[0])
  }

  const sendProductName = (name) => {
    navigate(`/do-do-house/Product?productName=${name}`);
  };
  return (
    <Container>
      <Row>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(1, 0.5, 0); handlePosition(0, 0, .7); handleButtonClick(); handleCard(true); filterProducts(18) }} className='p-3' style={{ position: 'absolute', bottom: '28vh', left: '43vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(.1, .1, .2); handlePosition(-2.5, .3, 1); handleButtonClick(); handleCard(true); filterProducts(19) }} className='p-3' style={{ position: 'absolute', bottom: '25vh', left: '59vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(.16, 0, 3.2); handlePosition(-1, 1, 0); handleButtonClick(); handleCard(true); filterProducts(12) }} className='p-3' style={{ position: 'absolute', bottom: '26vh', left: '54vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          <div className='card-warpper2'>
            {cardIsVisible && (
              <Card style={{ zIndex: 100 }} width={'20vw'}>
                <Card.Img
                  onClick={() => { sendProductName(product.name) }}
                  style={{ objectFit: 'contain' }}
                  variant="top"
                  // src='img/chair/chair1.png'
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
                      <Button onClick={() => { console.log('click') }} variant="blue" className='px-2 pt-2 pb-0 rounded-circle'>
                        <img src='img/plus.svg' className='add-icon' />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

          </div>
        </Col>
      </Row>
      <Row >

      </Row>
      <Row>
        <Canvas
          style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, zIndex: -1 }} // Set canvas size using inline style
          camera={{ position: [16, 6, 16], fov: 30, near: 1, far: 5000 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          onMouseUp={goToIni}
          onMouseDown={() => { handleButtonClick(); handleCard(false) }}
        >
          <Lights_bedroom />
          {model && <primitive object={model} />}
          <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false} />
        </Canvas>
      </Row>
    </Container>

  );
};

const Kitchen = () => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  const modelPositionRef = useRef({ x: 0, y: -1.5, z: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [cardIsVisible, setCardVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      'model/reality_room_edited/kitchen2.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(modelPositionRef.current.x, modelPositionRef.current.y, modelPositionRef.current.z);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts
  const products_raw = [
    { id: 8, name: '舒適靈動座椅', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=12mGXyj98r9oayDjJV5cuFZlP6S8rrpY2'},
    { id: 15, name: '中島廚房桌', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1gTz3YnxeZnsIw9Egi2oUZmoj4olrOKaQ'},
    { id: 23, name: '大理石洗手台', price: 392, type: 'Utensil',url: 'https://drive.google.com/uc?export=view&id=1WpUNak5UZzHNyn9wm6CkstpSi4Qkaubr'}
  ]
  const handleCamera = (X, Y, Z) => {
    gsap.to(cameraRef.current.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const handlePosition = (X, Y, Z) => {
    gsap.to(model.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const goToIni = () => {
    gsap.to(cameraRef.current.position, {
      x: 16,
      y: 6,
      z: 16,
      duration: 1.5,
    });
    gsap.to(model.position, {
      x: modelPositionRef.current.x,
      y: modelPositionRef.current.y, // Set your desired initial y position
      z: modelPositionRef.current.z, // Set your desired initial z position
      duration: 1.5,
    });
    setIsVisible(true)
    setCardVisible(false)
  };
  // 點擊事件處理程序，將 isVisible 設置為 false，隱藏所有按鈕
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  //處理卡片
  const handleCard = (bool) => {
    setCardVisible(bool)
  }
  const filterProducts = (id) => {
    setProduct(products_raw.filter(product => product.id === id)[0])

  }
  const sendProductName = (name) => {
    navigate(`/do-do-house/Product?productName=${name}`);
  };
  return (
    <Container>
      <Row>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(0, 0, -1); handlePosition(1, .9, 1); handleButtonClick(); handleCard(true); filterProducts(8) }} className='p-3' style={{ position: 'absolute', bottom: '28vh', left: '43vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(.5, .1, -.5); handlePosition(-2, .5, 2); handleButtonClick(); handleCard(true); filterProducts(15) }} className='p-3' style={{ position: 'absolute', bottom: '28vh', left: '50vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(.2, .25, .4); handlePosition(-.8, 0, 2); handleButtonClick(); handleCard(true); filterProducts(23) }} className='p-3' style={{ position: 'absolute', bottom: '35vh', left: '57vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          <div className='card-warpper2'>
            {cardIsVisible && (
              <Card style={{ zIndex: 100 }} width={'20vw'}>
                <Card.Img
                  onClick={() => { sendProductName(product.name) }}
                  style={{ objectFit: 'contain' }}
                  variant="top"
                  // src='img/chair/chair1.png'
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
                      <Button onClick={() => { console.log('click') }} variant="blue" className='px-2 pt-2 pb-0 rounded-circle'>
                        <img src='img/plus.svg' className='add-icon' />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

          </div>
        </Col>
      </Row>
      <Row>
        <Canvas
          style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, zIndex: -1 }} // Set canvas size using inline style
          camera={{ position: [16, 6, 16], fov: 30, near: 1, far: 5000 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          onMouseUp={goToIni}
          onMouseDown={() => { handleButtonClick() }}
        >
          <Lights_kitchen />
          {model && <primitive object={model} />}
          <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false} />
        </Canvas>
      </Row>
    </Container>

  );
};

const LivingRoom = () => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  const modelPositionRef = useRef({ x: 0, y: -2.8, z: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [cardIsVisible, setCardVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  const products_raw = [
    { id: 21, name: '藝術長燈', price: 392, type: 'Lamp',url: 'https://drive.google.com/uc?export=view&id=1BQqymnlWQH1iqmUSlgI8B0xGG4b81Vql'},
    { id: 14, name: '黝黑玻璃桌', price: 392, type: 'Table',url: 'https://drive.google.com/uc?export=view&id=1xRwmfp7dgt4J_76RKLfsQ1Pklmk1rhOA'},
    { id: 9, name: 'L型酷沙發', price: 392, type: 'Chair',url: 'https://drive.google.com/uc?export=view&id=1nJQE8JoLX6p_nqwTu8V4p61jbAAQuIPU'},
  ]
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      'model/reality_room_edited/livingRoom2.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(modelPositionRef.current.x, modelPositionRef.current.y, modelPositionRef.current.z);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts
  const handleCamera = (X, Y, Z) => {
    gsap.to(cameraRef.current.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const handlePosition = (X, Y, Z) => {
    gsap.to(model.position, {
      x: X, // Set your desired initial x position
      y: Y, // Set your desired initial y position
      z: Z, // Set your desired initial z position
      duration: 1.5,
    });
  };
  const goToIni = () => {
    gsap.to(cameraRef.current.position, {
      x: 15,
      y: 3,
      z: 12,
      duration: 1.5,
    });
    gsap.to(model.position, {
      x: modelPositionRef.current.x,
      y: modelPositionRef.current.y, // Set your desired initial y position
      z: modelPositionRef.current.z, // Set your desired initial z position
      duration: 1.5,
    });
    setIsVisible(true)
    setCardVisible(false)
  };
  // 點擊事件處理程序，將 isVisible 設置為 false，隱藏所有按鈕
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  //處理卡片
  const handleCard = (bool) => {
    setCardVisible(bool)
  }
  const filterProducts = (id) => {
    setProduct(products_raw.filter(product => product.id === id)[0])
  }
  const sendProductName = (name) => {
    navigate(`/do-do-house/Product?productName=${name}`);
  };
  return (
    <Container>
      <Row>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(3, 0, 4); handlePosition(1.5, -.9, 3); handleButtonClick(); handleCard(true); filterProducts(21) }} className='p-3' style={{ position: 'absolute', bottom: '40vh', left: '51vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(2, 2, 2); handlePosition(0, 0, .8); handleButtonClick(); handleCard(true); filterProducts(14) }} className='p-3' style={{ position: 'absolute', bottom: '23vh', left: '49vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          {isVisible && (<Button variant="opacity" onClick={() => { handleCamera(5, 0, 0); handlePosition(0, -.5, 0); handleButtonClick(); handleCard(true); filterProducts(9) }} className='p-3' style={{ position: 'absolute', bottom: '28vh', left: '43vw', borderRadius: '90%' }} />
          )}
        </Col>
        <Col>
          <div className='card-warpper2'>
            {cardIsVisible && (
              <Card style={{ zIndex: 100 }} width={'20vw'}>
                <Card.Img
                  onClick={() => { sendProductName(product.name) }}
                  style={{ objectFit: 'contain' }}
                  variant="top"
                  // src='img/chair/chair1.png'
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
                      <Button onClick={() => { console.log('click') }} variant="blue" className='px-2 pt-2 pb-0 rounded-circle'>
                        <img src='img/plus.svg' className='add-icon' />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

          </div>
        </Col>
      </Row>
      <Row>
        <Canvas
          style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, zIndex: -1 }} // Set canvas size using inline style
          camera={{ position: [15, 3, 12], fov: 30, near: 1, far: 5000 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          onMouseUp={goToIni}
          onMouseDown={() => { handleButtonClick() }}
        >
          <Lights_livingRoom />
          {model && <primitive object={model} />}
          <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false} />
        </Canvas>
      </Row>
    </Container>
  );
};

const Inspire = () => {
  const [radioValue, setRadioValue] = useState('1');
  const [modelSwitcher, setModelSwitcher] = useState('BedRoom')
  const radios = [
    { name: 'BedRoom', value: '1' },
    { name: 'Kitchen', value: '2' },
    { name: 'LivingRoom', value: '3' },
  ];
  let Room;
  switch (modelSwitcher) {
    case 'BedRoom':
      Room = <BedRoom />;
      break;
    case 'Kitchen':
      Room = <Kitchen />;
      break;
    case 'LivingRoom':
      Room = <LivingRoom />;
      break;
    default:
      Room = <BedRoom />;
  }

  return (
    <Container fluid>
      {/* navbar */}
      <Navbar bg="light" data-bs-theme="light" className='justify-content-around'>
        <Navbar.Brand href="/do-do-house/Home" className='me-0'>Do Do House</Navbar.Brand>
        <Nav activeKey="/do-do-house/Inspire">
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
                  onChange={(e) => {
                    setRadioValue(e.currentTarget.value);
                    setModelSwitcher(radio.name);
                  }}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      {Room}
    </Container>

  );
};

export default Inspire;
