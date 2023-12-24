import '../css/cart.css';
import IP_Path from './IP';
import { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Nav, Navbar, Breadcrumb } from 'react-bootstrap';
function Cart(prop) {
    //設定cart
    const [cartNum, setCartNum] = useState(1);
    const [cartItem, saveCartItem] = useState([])
    const [triggerer, triggerCartUpdate] = useState(true);
    const [total,countTotal]=useState(0);
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
                saveCartItem(Object.values(jsonData));
                var tmp=0;
                (Object.values(jsonData)).forEach(element => {
                    tmp=tmp+element.total
                });
                countTotal(tmp)
            }
        })
    }, [triggerer])
    const Delete = (GoId) => {
        var data = {
            goid: GoId
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
            triggerCartUpdate(!triggerer)
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
                    {cartNum === 0 ? (
                        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <h3>購物車目前是空的喔！快去看看家俱吧！</h3>
                        </Col>
                    ) : (
                        <>
                            <Col md={9}>
                                <Table  bordered>
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
                                        {
                                            cartItem.map((product, idx) => (
                                                <tr>
                                                    <td>{idx + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>$ {product.price}</td>
                                                    <td>{product.amount}</td>
                                                    <td>$ {product.total}</td>
                                                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button variant="light" style={{display:"flex",alignItems:'center'}}
                                                        onClick={() => {
                                                            Delete(product.id)
                                                        }}>
                                                            <img src='img/trash-can.svg' width={"20px"} height={"20px"} alt="刪除購物車商品"/>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table >
                            </Col >
                            <Col md={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Container fluid >
                                    <Row className='light-orange'>
                                        <Col md={12} className='mb-5 mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                                            <h3>購物車金額</h3>
                                        </Col>
                                        <Col md={6} className='ps-5'>
                                            <p className='mt-1'>總計</p>
                                        </Col>
                                        <Col md={6} className='pe-5' style={{ display: 'flex', justifyContent: 'end' }}>
                                            <p className='mt-1' style={{ color: '#B88E2F' }}>$ {total}</p>
                                        </Col>
                                        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button className='checkOutButton mb-3 mt-5' href='/do-do-house/CheckOut' variant='outline-dark'>
                                                <p style={{ textAlign: 'center' }}>結帳</p>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </>
                    )}
                </Row >
            </Container >
        </Container >


    );
}

export default Cart;
