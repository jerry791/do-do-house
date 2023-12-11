import '../css/inspire.css';
import { useState, useRef, useEffect } from 'react';
import { Button, Card, ToggleButton, Container, Row, Col, Nav, Navbar, ButtonGroup } from 'react-bootstrap';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";
const ThreeJSComponent = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Bed Room', value: '1' },
    { name: 'Kitchen', value: '2' },
    { name: 'Living Room', value: '3' },

  ];
  const canvasRef = useRef(null);
  useEffect(() => {
    //create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff)
    //setting size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight * 0.65,
    }
    //setting camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 5000)
    camera.position.z = 5;
    camera.position.x = 5
    camera.position.y = 5
    //setting render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // use ref as a mount point of the Three.js scene instead of the document.body
    canvasRef.current && canvasRef.current.appendChild(renderer.domElement);
    //import gltf loader
    const loader = new GLTFLoader();
    loader.load('../../public/model/reality_room_edited/bedRoom3.glb', function (gltf) {
      let mesh = gltf.scene;
      // mesh.position.set(0,-11,0);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
    }, undefined, function (error) {
      console.error(error);
    });
    //create cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    renderer.render(scene, camera);
  }, []);

  // useEffect(() => {
  //   // Scene
  //   const scene = new THREE.Scene();
  //   scene.background = new THREE.Color(0xffffff);

  //   // GLTF Loader
  //   const loader = new GLTFLoader();
  //   // loader.load(
  //   //   '../../public/model/reality_room_edited/livingRoom2.glb',
  //   //   (gltf) => {
  //   //     let mesh = gltf.scene;
  //   //     mesh.position.set(0, 0, 0);
  //   //     scene.add(mesh);
  //   //   },
  //   //   undefined,
  //   //   (error) => {
  //   //     console.error(error);
  //   //   }
  //   // );
  //   var geometry = new THREE.BoxGeometry(1, 1, 1);
  //   var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   var cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);
  //   // Sizes
  //   const sizes = {
  //     width: window.innerWidth,
  //     height: window.innerHeight*0.65,
  //   };

  //   // Ambient Light
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  //   scene.add(ambientLight);

  //   // Camera
  //   const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 5000);
  //   camera.position.x = 5;
  //   camera.position.y = 5;
  //   camera.position.z = 5;
  //   scene.add(camera);

  //   // Renderer
  //   // const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(3);
  //   // use ref as a mount point of the Three.js scene instead of the document.body
  //   canvasRef.current && canvasRef.current.appendChild( renderer.domElement );

  //   // Controls
  //   const controls = new OrbitControls(camera, canvasRef.current);
  //   controls.enableDamping = true;
  //   controls.enablePan = true;
  //   controls.enableZoom = true;
  //   controls.autoRotate = false;
  //   controls.autoRotateSpeed = 1;

  //   // Resize
  //   const handleResize = () => {
  //     sizes.width = window.innerWidth;
  //     sizes.height = window.innerHeight*0.65;

  //     camera.aspect = sizes.width / sizes.height;
  //     camera.updateProjectionMatrix();

  //     renderer.setSize(sizes.width, sizes.height);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Animation Loop
  //   const loop = () => {
  //     controls.update();
  //     renderer.render(scene, camera);
  //     window.requestAnimationFrame(loop);
  //   };

  //   loop();

  //   // // GSAP Timeline
  //   // const tl = gsap.timeline({
  //   //   defaults: { duration: 1.5 },
  //   // });

  //   // tl.fromTo('.boxContainer', { y: '100%' }, { y: '0%' });

  //   // // Event Listeners
  //   // let isDownModel = false;
  //   // const dots = document.querySelectorAll('.dot');

  //   // const handleMouseDown = () => {
  //   //   isDownModel = true;
  //   // };

  //   // const handleMouseUp = () => {
  //   //   isDownModel = false;
  //   //   dots.forEach((item) => {
  //   //     item.style.background = '#fff';
  //   //     item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //   //   });
  //   // };

  //   // const handleMouseLeave = () => {
  //   //   isDownModel = false;
  //   //   dots.forEach((item) => {
  //   //     item.style.background = '#fff';
  //   //     item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //   //   });
  //   // };

  //   // const handleMouseMove = () => {
  //   //   if (!isDownModel) {
  //   //     dots.forEach((item) => {
  //   //       item.style.background = '#fff';
  //   //       item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //   //     });
  //   //   } else {
  //   //     dots.forEach((item) => {
  //   //       item.style.background = 'rgba(0, 0, 0, 0)';
  //   //     });
  //   //   }
  //   // };

  // //   canvasRef.current.addEventListener('mousedown', handleMouseDown);
  // //   canvasRef.current.addEventListener('mouseup', handleMouseUp);
  // //   canvasRef.current.addEventListener('mouseleave', handleMouseLeave);
  // //   canvasRef.current.addEventListener('mousemove', handleMouseMove);

  //   // Cleanup
  //   // return () => {
  //   //   window.removeEventListener('resize', handleResize);
  //   //   // canvasRef.current.removeEventListener('mousedown', handleMouseDown);
  //   //   // canvasRef.current.removeEventListener('mouseup', handleMouseUp);
  //   //   // canvasRef.current.removeEventListener('mouseleave', handleMouseLeave);
  //   //   // canvasRef.current.removeEventListener('mousemove', handleMouseMove);
  //   // };
  // }, []);
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
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      {/* <canvas ref={canvasRef}/> */}
      {/* <Canvas ref={canvasRef}/> */}
      <div ref={canvasRef}></div>
    </Container>

  );
};

export default ThreeJSComponent;