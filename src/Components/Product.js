import { useEffect, useState } from 'react';
import '../css/product.css';
import { useLocation } from "react-router-dom";
import IP_Path from './IP';
import { Button, Container, Row, Col, Nav, Navbar, Breadcrumb } from 'react-bootstrap';
import ChatBot from './ChatBot';

function Product() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const productName = params.get('productName');
    const [productInfo,saveProInfo] = useState([]);
    const [productNum, setProductNum] = useState(1);
    //設定cart
    const [cartNum, setCartNum] = useState(0);
    const [triggerer, triggerCartUpdate] = useState(true);
    const minusone =()=> {
        if(productNum>1){
            setProductNum(productNum-1);
        }
    }
    const plusone =()=> setProductNum(productNum+1);
    useEffect(()=>{
        var data = {
            name: productName
          };
          const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
          };
          // product:找特定商品
          fetch(IP_Path+'product', {
            method: "POST",
            headers: headers,
            // mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache",
            body: JSON.stringify(data)
          }).then((response) => {
            return response.json();
          }).then((jsonData) => {
            saveProInfo(jsonData)
          })
    },[])

    useEffect(() => {
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
            if (jsonData.result === 'empty') {
                setCartNum(0)
            } else {
                setCartNum((Object.values(jsonData)).length);
            }
        })
    }, [triggerer])
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
    return (
        <Container fluid>
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
                            <img src='img/cart-dark.svg' width={'25px'} alt='cart'/>
                            <div className='cart-point'>
                                <p>{cartNum}</p>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <Container fluid className='crumb pt-4 pb-1 mb-5'>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/do-do-house/Home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/do-do-house/Shop">
                            Shop
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{productName}</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </Container>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={4} style={{display:'flex',justifyContent:'center'}}>
                        <img src={productInfo.url} className='productImg' alt='cart'/>
                    </Col>
                    <Col className='ms-5'>
                        <h3>{productInfo.name}</h3>
                        <p className='subtitle'>{productInfo.tpye}</p>
                        <Row>
                            <Col md={8}>
                                <p className='mt-3 mb-5'>{productInfo.description}</p>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} className='align-items-center justify-content-between p-2 light shadow' style={{ display: 'flex' }}>
                                <Button variant="light" onClick={minusone}>-</Button>
                                <p>{productNum}</p>
                                <Button variant="light" onClick={plusone}>+</Button>
                            </Col>
                            <Col md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button variant="light shadow p-2" style={{ height: '100%' }} onClick={()=>{addToCart(productInfo.name,productNum)}}>加到購物車</Button>
                            </Col>
                            <Col md={3} style={{ display: 'flex', alignItems: 'center' }} >
                                <Button href='/do-do-house/cart' variant="light shadow p-2" style={{ height: '100%',display:'flex',alignItems:'center' }} onClick={()=>{addToCart(productInfo.name,productNum);}}>直接購買</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <ChatBot/>
        </Container>


    );
}

export default Product;
