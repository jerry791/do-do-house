import '../css/check-out.css';
import { Button, Form, Container, Row, Col, Nav, Navbar, Breadcrumb, ListGroup } from 'react-bootstrap';
function CheckOut(prop) {
    //需要一次發送所有購物車ID
    var data = {
        goid: 2,
        name:'王小明',
        number:'0912345678',
        email:'jerry12345@gmail.com'
      };
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
      // product:找特定商品
      fetch('http://192.168.165.125:5000/check', {
        method: "POST",
        headers: headers,
        // mode: "no-cors", // no-cors, *cors, same-origin
        cache: "no-cache",
        body: JSON.stringify(data)
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
      })
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
                        <Breadcrumb.Item href="/do-do-house/Cart">
                            Cart
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Check Out</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <h3>客戶資訊</h3>
                            </Col>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>名字</Form.Label>
                                            <Form.Control type="text" placeholder="小明" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group md={6} className="mt-3" controlId="LastName">
                                            <Form.Label>姓</Form.Label>
                                            <Form.Control type="text" placeholder="王" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>手機號碼</Form.Label>
                                            <Form.Control type="tel" placeholder="0912345678"/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com"/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>地址</Form.Label>
                                            <Form.Control type="text" placeholder="地址"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Row>

                    </Col>

                    <Col >
                        <Container>
                            <Row className='mb-3'>
                                <Col>
                                    <p className='list-title'>您的家具</p>
                                </Col>
                                <Col>
                                    <p className='list-title text-end'>小計</p>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <p>Asgaard sofa x 1</p>
                                </Col>
                                <Col>
                                    <p className='text-end'>$ 250,000</p>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <p>運費</p>
                                </Col>
                                <Col>
                                    <p className='text-end'>$ 100</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='mb-3' md={12} style={{width:'100%',height:'1px', backgroundColor:'#ccc'}}/>

                                <Col >
                                    <p>應付金額</p>
                                </Col>
                                <Col>
                                    <p className='list-title text-end' style={{ color: '#B88E2F' }}>$ 250,100</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button size="lg" className='mb-3 mt-5 checkOutButton' href='/do-do-house/Confirm' variant="outline-dark">
                                        <p style={{ textAlign: 'center' }}>下單</p>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default CheckOut;
