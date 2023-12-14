import '../css/inspire.css';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

// 共通的燈光組件
const Lights = ({ intensity }) => (
  <>
    <ambientLight intensity={intensity} />
    <hemisphereLight intensity={intensity * 4} />
  </>
);

// 共通的房間組件
const Room = ({ modelPath, initialCameraPosition, initialModelPosition, lightsIntensity, products, roomName }) => {
  const [model, setModel] = useState(null);
  const cameraRef = useRef();
  const modelPositionRef = useRef(initialModelPosition);
  const [isVisible, setIsVisible] = useState(true);
  const [cardIsVisible, setCardVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
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
      x: X,
      y: Y,
      z: Z,
      duration: 1.5,
    });
  };

  const handlePosition = (X, Y, Z) => {
    gsap.to(model.position, {
      x: X,
      y: Y,
      z: Z,
      duration: 1.5,
    });
  };

  const goToIni = () => {
    gsap.to(cameraRef.current.position, {
      x: initialCameraPosition[0],
      y: initialCameraPosition[1],
      z: initialCameraPosition[2],
      duration: 1.5,
    });

    gsap.to(model.position, {
      x: modelPositionRef.current.x,
      y: modelPositionRef.current.y,
      z: modelPositionRef.current.z,
      duration: 1.5,
    });

    setIsVisible(true);
    setCardVisible(false);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleCard = (bool) => {
    setCardVisible(bool);
  };

  const filterProducts = (id) => {
    setProduct(products.filter(product => product.id === id)[0]);
    console.log(products.filter(product => product.id === id)[0]);
  };

  const sendProductName = (name) => {
    navigate(`/do-do-house/Product?productName=${name}`);
  };

  return (
    <Container>
      {/* ... 其他 UI 元素 ... */}

      <Row>
        <Canvas
          style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, zIndex: -1 }}
          camera={{ position: initialCameraPosition, fov: 30, near: 1, far: 5000 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          onMouseUp={goToIni}
          onMouseDown={() => { handleButtonClick(); handleCard(false); }}
        >
          <Lights intensity={lightsIntensity} />
          {model && <primitive object={model} />}
          <OrbitControls enableDamping={true} enablePan={false} enableZoom={true} autoRotate={false} />
        </Canvas>
      </Row>
    </Container>
  );
};

// BedRoom 組件
const BedRoom = () => {
  const products = [
    // 商品數據
  ];

  return (
    <Room
      modelPath='model/reality_room_edited/bedRoom3.glb'
      initialCameraPosition={[16, 6, 16]}
      initialModelPosition={{ x: 0, y: -2, z: 0 }}
      lightsIntensity={1}
      products={products}
      roomName='BedRoom'
    />
  );
};

// Kitchen 組件
const Kitchen = () => {
  const products = [
    // 商品數據
  ];

  return (
    <Room
      modelPath='model/reality_room_edited/kitchen2.glb'
      initialCameraPosition={[16, 6, 16]}
      initialModelPosition={{ x: 0, y: -1.5, z: 0 }}
      lightsIntensity={1}
      products={products}
      roomName='Kitchen'
    />
  );
};

// LivingRoom 組件
const LivingRoom = () => {
  const products = [
    // 商品數據
  ];

  return (
    <Room
      modelPath='model/reality_room_edited/livingRoom2.glb'
      initialCameraPosition={[16, 6, 16]}
      initialModelPosition={{ x: 0, y: -2.8, z: 0 }}
      lightsIntensity={2}
      products={products}
      roomName='LivingRoom'
    />
  );
};

const Inspire = () => {
  const [radioValue, setRadioValue] = useState('1');
  const [modelSwitcher, setModelSwitcher] = useState('BedRoom');

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
      {/* ... 其他 UI 元素 ... */}
      {Room}
    </Container>
  );
};

export default Inspire;