import { useState } from 'react';
import '../css/product.css';
import { Button, Container, Row, Col, Nav, Navbar, Breadcrumb } from 'react-bootstrap';


function Product() {
    const [productNum, setProductNum] = useState(1);
    const minusone =()=> {
        if(productNum>1){
            setProductNum(productNum-1);
        }
    }
    const plusone =()=> setProductNum(productNum+1);
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
                    <Nav.Item>
                        <Nav.Link href="/do-do-house/Contact us" className='me-5'>Contact us</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/do-do-house/Cart">
                            <img src='img/cart-dark.svg' width={'25px'} alt='cart'/>
                            <div className='cart-point'>
                                <p>0</p>
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
                        <Breadcrumb.Item active>{ }</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </Container>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={4}>
                        <img src='img/sink.png' className='productImg' alt='cart'/>
                    </Col>
                    <Col>
                        <h3>Asgaard sofa</h3>
                        <p className='subtitle'>utensil</p>
                        <Row>
                            <Col md={8}>
                                <p className='mt-3 mb-5'>Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.</p>
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
                                <Button variant="light shadow p-2" style={{ height: '100%' }}>Add  To Cart</Button>
                            </Col>
                            <Col md={3} style={{ display: 'flex', alignItems: 'center' }} >
                                <Button variant="light shadow p-2" style={{ height: '100%' }}>Purchase</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>


    );
}

export default Product;
