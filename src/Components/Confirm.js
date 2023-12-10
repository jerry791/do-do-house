import '../css/check-out.css';
import { Button, Form, Container, Row, Col, Nav, Navbar, Breadcrumb, ListGroup } from 'react-bootstrap';
function Confirm(prop) {
    return (
        <Container fluid>
            <Navbar bg="transparent" data-bs-theme="light" className='justify-content-around'>
                <Navbar.Brand href="/do-do-house/Home" className='me-0'>Do Do House</Navbar.Brand>
                <Nav>
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
                                <p>1</p>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <Container>
                <Container fluid>
                    <Row>
                        <Col md={12} className="mt-5" style={{ textAlign: 'center' }}>
                            <h1>購買成功!</h1>
                        </Col>
                        <Col md={12} className='mt-5'>
                            <h2>我們已收到您的訂單</h2>
                            <h2>訂單編號 : <span style={{ color: '#B88E2F' }}>120000000</span></h2>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='mt-5'>
                    <Row>
                        <Col md={12} className='mt-5 pt-5'>
                            <h2>想再買家具嗎?<Button variant="dark" className='ms-4' href='/do-do-house/shop'>再去逛逛</Button></h2>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    );
}

export default Confirm;
