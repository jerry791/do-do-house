import '../css/inspire.css';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import gsap from "gsap";
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
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      'model/reality_room_edited/bedRoom3.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(0, 0, 0);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleMouseUp = () => {
    gsap.to(cameraRef.current.position, {
      x: 8, // Set your desired initial x position
      y: 8, // Set your desired initial y position
      z: 8, // Set your desired initial z position
      duration: 1.5,
    });
  };
  return (
    <Canvas
      style={{ width: '100vw', height: '65vh' }} // Set canvas size using inline style
      camera={{ position: [8, 8, 8], fov: 30, near: 1, far: 5000 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera;
      }}
      onMouseUp={handleMouseUp}
    >
      <Lights_bedroom />
      {model && <primitive object={model} />}
      <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false}/>
    </Canvas>
  );
};

const Kitchen = () => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      'model/reality_room_edited/kitchen2.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(0, 0, 0);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleMouseUp = () => {
    gsap.to(cameraRef.current.position, {
      x: 8, // Set your desired initial x position
      y: 8, // Set your desired initial y position
      z: 8, // Set your desired initial z position
      duration: 1.5,
    });
  };
  return (
    <Canvas
      style={{ width: '100vw', height: '65vh' }} // Set canvas size using inline style
      camera={{ position: [8, 8, 8], fov: 30, near: 1, far: 5000 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera;
      }}
      onMouseUp={handleMouseUp}
    >
      <Lights_kitchen />
      {model && <primitive object={model} />}
      <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false}/>
    </Canvas>
  );
};

const LivingRoom = () => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      'model/reality_room_edited/livingRoom2.glb',
      (gltf) => {
        let loadedModel = gltf.scene;
        loadedModel.position.set(0, -1, 0);
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []); // Empty dependency array means this effect runs once when the component mounts
  const handleMouseUp = () => {
    gsap.to(cameraRef.current.position, {
      x: 8, // Set your desired initial x position
      y: 8, // Set your desired initial y position
      z: 8, // Set your desired initial z position
      duration: 1.5,
    });
  };
  return (
    <Canvas
      style={{ width: '100vw', height: '65vh' }} // Set canvas size using inline style
      camera={{ position: [8, 8, 8], fov: 30, near: 1, far: 5000 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera;
      }}
      onMouseUp={handleMouseUp}
    >
      <Lights_livingRoom />
      {model && <primitive object={model} />}
      <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false}/>
    </Canvas>
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
      <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
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
