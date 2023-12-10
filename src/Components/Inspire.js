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
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const radios = [
    { name: 'Bed Room', value: '1' },
    { name: 'Kitchen', value: '2' },
    { name: 'Living Room', value: '3' },

  ];
  // const canvasRef = useRef();

  // useEffect(() => {
  //   // Scene
  //   const scene = new THREE.Scene();
  //   scene.background = new THREE.Color(0xffffff);

  //   // GLTF Loader
  //   const loader = new GLTFLoader();
  //   loader.load(
  //     '../3D_model/reality_room_edited/livingRoom2.glb',
  //     (gltf) => {
  //       let mesh = gltf.scene;
  //       mesh.position.set(0, 0, 0);
  //       scene.add(mesh);
  //     },
  //     undefined,
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  //   // Sizes
  //   const sizes = {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
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
  //   const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(3);

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
  //     sizes.height = window.innerHeight;

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

  //   // GSAP Timeline
  //   const tl = gsap.timeline({
  //     defaults: { duration: 1.5 },
  //   });

  //   tl.fromTo('.boxContainer', { y: '100%' }, { y: '0%' });

  //   // Event Listeners
  //   let isDownModel = false;
  //   const dots = document.querySelectorAll('.dot');

  //   const handleMouseDown = () => {
  //     isDownModel = true;
  //   };

  //   const handleMouseUp = () => {
  //     isDownModel = false;
  //     dots.forEach((item) => {
  //       item.style.background = '#fff';
  //       item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //     });
  //   };

  //   const handleMouseLeave = () => {
  //     isDownModel = false;
  //     dots.forEach((item) => {
  //       item.style.background = '#fff';
  //       item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //     });
  //   };

  //   const handleMouseMove = () => {
  //     if (!isDownModel) {
  //       dots.forEach((item) => {
  //         item.style.background = '#fff';
  //         item.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 0px 14px';
  //       });
  //     } else {
  //       dots.forEach((item) => {
  //         item.style.background = 'rgba(0, 0, 0, 0)';
  //       });
  //     }
  //   };

  //   canvasRef.current.addEventListener('mousedown', handleMouseDown);
  //   canvasRef.current.addEventListener('mouseup', handleMouseUp);
  //   canvasRef.current.addEventListener('mouseleave', handleMouseLeave);
  //   canvasRef.current.addEventListener('mousemove', handleMouseMove);

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     canvasRef.current.removeEventListener('mousedown', handleMouseDown);
  //     canvasRef.current.removeEventListener('mouseup', handleMouseUp);
  //     canvasRef.current.removeEventListener('mouseleave', handleMouseLeave);
  //     canvasRef.current.removeEventListener('mousemove', handleMouseMove);
  //   };
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
      <Canvas className="webgl" />
    </Container>

  );
};

export default ThreeJSComponent;
// function App() {
//   const [radioValue, setRadioValue] = useState('1');
//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   const radios = [
//     { name: 'Bed Room', value: '1' },
//     { name: 'Kitchen', value: '2' },
//     { name: 'Living Room', value: '3' },

//   ];
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xffffff)
//   // scene.background = new THREE.Color(0x000000)
//   //gltf loader
//   const loader = new GLTFLoader();

//   loader.load('model/reality_room_edited/livingRoom2.glb', function (gltf) {

//     let mesh = gltf.scene;
//     // mesh.position.set(0,-11,0);
//     mesh.position.set(0, 0, 0);
//     scene.add(mesh);
//   }, undefined, function (error) {

//     console.error(error);

//   });
//   const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   }
//   //light
//   const ambientLight = new THREE.AmbientLight(0xffffff, 2)
//   scene.add(ambientLight)
//   //camera
//   //可見視野設定 : 45度。50度會導致扭曲(魚眼效果)
//   //相機的縱橫比 : 800/600，也就是4:3。其他常見的有1:1、16:9
//   //near clipping point:0.1 far clipping point : 100，表示相機最遠就到100，最近就到0.1
//   const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 5000)
//   camera.position.x = 5
//   camera.position.y = 5
//   camera.position.z = 5
//   // const helper = new THREE.CameraHelper(camera)
//   scene.add(camera)
//   //Render it
//   const canvas = document.querySelector(".webgl")
//   const renderer = new THREE.WebGLRenderer({ canvas })

//   //define how big the canvas is
//   renderer.setSize(sizes.width, sizes.height)
//   renderer.render(scene, camera)
//   renderer.setPixelRatio(3)

//   //Resize
//   //監聽視窗有沒有執行resize這個事件
//   window.addEventListener('resize', () => {
//     //update Sizes
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;
//     //update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()//.updateProjectionMatrix() 方法會根據相機的參數來更新投影矩陣，Must be called after any change of parameters.
//     //rerender
//     renderer.setSize(sizes.width, sizes.height)
//   })
//   return (
//     <Container fluid>
//       {/* navbar */}
//       <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
//         <Navbar.Brand href="/do-do-house/Home" className='me-0'>Do Do House</Navbar.Brand>
//         <Nav activeKey="/do-do-house/Inspire">
//           <Nav.Item >
//             <Nav.Link href="/do-do-house/Home" className='me-5'>Home</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/do-do-house/Shop" className='me-5'>Shop</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/do-do-house/Inspire" className='me-5'>Inspire</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/do-do-house/Contact us" className='me-5'>Contact us</Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Nav>
//           <Nav.Item>
//             <Nav.Link href="/do-do-house/Cart">
//               <img src='img/cart-dark.svg' alt='cart' width={'25px'} />
//               <div className='cart-point'>
//                 <p>0</p>
//               </div>
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </Navbar>
//       {/* body */}
//       <Container fluid>
//         <Row className="justify-content-md-center">
//           <Col md="auto"><h3 className='text-dark mt-5'>空間靈感</h3></Col>
//         </Row>
//         <Row className="justify-content-center mt-4">
//           <Col md={4}>
//             <ButtonGroup className='w-100'>
//               {radios.map((radio, idx) => (
//                 <ToggleButton
//                   key={idx}
//                   id={`radio-${idx}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   name="radio"
//                   value={radio.value}
//                   checked={radioValue === radio.value}
//                   onChange={(e) => setRadioValue(e.currentTarget.value)}
//                 >
//                   {radio.name}
//                 </ToggleButton>
//               ))}
//             </ButtonGroup>
//           </Col>
//         </Row>
//         {/* carousell */}
//       </Container>
//       <Canvas className="webgl">

//       </Canvas>
//       {/* <Container fluid className='position-absolute bottom-0'>
//         <Row className='mt-4 mb-5'>
//           <Carousel
//             className='mb-0'
//             activeIndex={index}
//             onSelect={handleSelect}
//             variant="dark"
//             indicators={false}
//             interval={null}
//             wrap={false}
//             nextIcon={<img src='img/arrow-right.svg' alt='arrow-right' width={'100px'} />}
//             prevIcon={<img src='img/arrow-left.svg' alt='arrow-left' width={'100px'} />}
//           >
//             <Carousel.Item>
//               <canvas class="webgl"></canvas>
//             </Carousel.Item>
//             <Carousel.Item>

//             </Carousel.Item>
//             <Carousel.Item>

//             </Carousel.Item>
//           </Carousel>
//         </Row>
//       </Container> */}

//     </Container>

//   );
// }

// export default App;
