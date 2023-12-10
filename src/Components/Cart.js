import '../css/cart.css';
import { Button, Table, Container, Row, Col, Nav, Navbar, Breadcrumb, ListGroup } from 'react-bootstrap';
function Cart(prop) {
    const Delete = () => {
        console.log('test')
    }
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
            <Container fluid className='crumb pt-4 pb-1 mb-5'>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/do-do-house/Home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/do-do-house/Shop">
                            Shop
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </Container>
            <Container>
                <Row>
                    <Col md={9}>
                        <Table bordered  >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>購物車商品</th>
                                    <th>金額</th>
                                    <th>數量</th>
                                    <th>小計</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Asgaard sofa</td>
                                    <td>$ 250,000</td>
                                    <td>1</td>
                                    <td>$ 250,000</td>
                                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="light" onClick={Delete}>
                                            <img src='img/trash-can.svg' width={"20px"} />
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Asgaard sofa</td>
                                    <td>$ 250,000</td>
                                    <td>1</td>
                                    <td>$ 250,000</td>
                                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="light" onClick={Delete}>
                                            <img src='img/trash-can.svg' width={"20px"} />
                                        </Button>
                                    </th>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={3} className='light-orange' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Row>
                            <Col md={12} className='mb-5 mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                                <h3>購物車金額</h3>
                            </Col>
                            <Col md={6} className='ps-5'>
                                <p className='mt-1'>總計</p>
                            </Col>
                            <Col md={6} className='pe-5' style={{ display: 'flex', justifyContent: 'end' }}>
                                <p className='mt-1' style={{color:'#B88E2F'}}>$ 250,000</p>
                            </Col>
                            <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className='checkOutButton mb-3 mt-5' href='/do-do-house/CheckOut' variant='outline-dark'>
                                    <p style={{ textAlign: 'center' }}>結帳</p>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>


    );
}

export default Cart;
