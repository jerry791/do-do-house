import '../css/check-out.css';
import IP_Path from './IP';
import { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Nav, Navbar, Form } from 'react-bootstrap';
function Confirm(prop) {
    const [cartNum, setCartNum] = useState(1);
    const [total, countTotal] = useState(0);
    const [formData, setFormData] = useState({
        Name: "",
        Phone: '',
        Email: '',
    });
    const [CheckoutInfo, setCheckoutInfo] = useState([{
        id: '',
        name: '',
        phone: '',
        email: ''
    }])
    //cartNum
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
    }, [])


    //CheckOut要的資訊
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    //查詢下單
    const [flag, changeFlag] = useState(0)
    const ResearchCheck = () => {
        // var data = {
        //     name: '王大陸',
        //     number: '0912345678',
        //     email: 'name@explain.com'
        // };

        var data = {
            name: formData.Name,
            number: formData.Phone,
            email: formData.Email
        };
        console.log(data)
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        // product:找特定商品
        fetch(IP_Path + 'check', {
            method: "POST",
            headers: headers,
            // mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache",
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log('returndata')
            console.log(jsonData)
            if (Object.keys(jsonData).length === 0) {
                changeFlag(1)
            } else {
                setCheckoutInfo(Object.values(jsonData))
                var tmp = 0;
                (Object.values(jsonData)).forEach(element => {
                    tmp = tmp + element.total
                });
                countTotal(tmp)
                changeFlag(2)
            }

        })
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
                                <p>{cartNum}</p>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <Container>
                <Container fluid>
                    <Row>
                        <Col md={12} className="mt-5" style={{ textAlign: 'center' }}>
                            <h3>🎊訂購完成🎊</h3>
                        </Col>
                        <Col md={12} className='mt-2 mb-2'>
                            <h2>我們已收到您的訂單，可輸入資料來查詢訂單</h2>
                        </Col>
                        <Col md={12} >
                            <Form>
                                <Row className='mb-2'>
                                    <Col md={4}>
                                        <Form.Group md={4} className="mt-3" controlId="LastName">
                                            <Form.Label>姓名</Form.Label>
                                            <Form.Control name="Name" type="text" placeholder="王小明" value={formData.Name} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>手機號碼</Form.Label>
                                            <Form.Control name="Phone" type="tel" placeholder='0912345678' value={formData.Phone} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name="Email" type="email" placeholder='name@example.com' value={formData.Email} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col md={12} className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="dark" onClick={ResearchCheck}>
                                    <p style={{ textAlign: 'center',color:'white' }}>查詢</p>
                                </Button>
                            </Col>
                        {flag === 0 ? null
                        : (
                            flag === 1 ? (
                                <Col md={12} className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ textAlign: 'center' }}>查無資料</p>
                                </Col>
                            ) : (
                                <>
                                    <Col md={6} className='mt-2'>
                                        <Table striped bordered >
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>客戶資訊</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>訂單編號</td>
                                                    <td>{CheckoutInfo[0].id}</td>
                                                </tr>
                                                <tr>
                                                    <td>客戶名字</td>
                                                    <td>{CheckoutInfo[0].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>電話號碼</td>
                                                    <td>{CheckoutInfo[0].number}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{CheckoutInfo[0].email}</td>
                                                </tr>
                                            </tbody>
                                        </Table >
                                    </Col>
                                    <Col md={6} className='mt-2'>
                                        <Table striped bordered >
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>訂單商品</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    CheckoutInfo.map((product, idx) => (
                                                        <tr>
                                                            <td>{product.pname} {product.price}元 x {product.amount}</td>
                                                            <td>$ {product.total}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr>
                                                    <td>總計</td>
                                                    <td>$ {total}</td>
                                                </tr>
                                            </tbody>
                                        </Table >
                                    </Col>
                                </>
                            )
                        )}
                    </Row>
                </Container>

            </Container>
        </Container>
    );
}

export default Confirm;
