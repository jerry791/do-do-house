import '../css/check-out.css';
import IP_Path from './IP';
import { useState, useEffect, useRef } from 'react';
import { Button, Form, Container, Row, Col, Nav, Navbar, Breadcrumb } from 'react-bootstrap';
function CheckOut(prop) {
    const [cartNum, setCartNum] = useState(1);
    const [cartItem, saveCartItem] = useState([])
    const [total, countTotal] = useState(0);
    //現在時間
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    //CheckOut要的資訊
    const [formData, setFormData] = useState({
        FirstName: "小祐",
        FamilyName: "蔡",
        Address: "高雄市鼓山區蓮海路70號",
        Phone: '0978578868',
        Email: 'name@example.com',
    });
    const sendToCheckOut = () => {
        cartItem.forEach(product => {
            var data = {
                goid:product.id,
                name: formData.FamilyName+formData.FirstName,
                number: formData.Phone,
                email: formData.Email
            };
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            fetch(IP_Path + 'check', {
                method: "POST",
                headers: headers,
                cache: "no-cache",
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                console.log(jsonData);
            })
        });

    }

    //設定綠界表單
    // 設定訂單亂碼
    function generateTradeNo() {
        const randomCode = Math.floor(100000 + Math.random() * 900000); // 產生七位數亂碼
        return String(randomCode);
    }
    // 設定時間格式
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的，因此要加 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
    //設定綠界form submit button
    const formRef = useRef(null);

    const ECPayDataObj = {
        MerchantTradeNo: 'dodotest' + generateTradeNo(),//頭要加上dodohouse
        MerchantTradeDate: formattedDate,
        PaymentType: 'aio',
        TotalAmount: total,
        TradeDesc: '嘟嘟好家俱',
        ItemName: JSON.stringify(cartItem),
        ChoosePayment: 'ALL',
    }
    const handleExternalSubmit = () => {
        // 手動觸發表單提交
        formRef.current.submit();
    };
    //查詢cart
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
                var tmp = 0;
                (Object.values(jsonData)).forEach(element => {
                    tmp = tmp + element.total
                });
                countTotal(tmp)
            }
        })
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
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
                                        <Form.Group md={6} className="mt-3" controlId="LastName">
                                            <Form.Label>姓</Form.Label>
                                            <Form.Control name="FamilyName" type="text" placeholder="王" value={formData.FamilyName} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>名字</Form.Label>
                                            <Form.Control name="FirstName" type="text" placeholder="小明" value={formData.FirstName} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>手機號碼</Form.Label>
                                            <Form.Control name="Phone" type="tel" placeholder='0912345678' value={formData.Phone} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name="Email" type="email" placeholder='name@example.com' value={formData.Email} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mt-3" controlId="FirstName">
                                            <Form.Label>地址</Form.Label>
                                            <Form.Control name="Address" type="text" placeholder='你的地址' value={formData.Address} onChange={handleInputChange} />
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
                                    <h3 className='list-title'>您的家具</h3>
                                </Col>
                                <Col>
                                    <h3 className='list-title text-end'>小計</h3>
                                </Col>
                            </Row>
                            {
                                cartItem.map((product, idx) => (
                                    <Row className='mb-3'>
                                        <Col>
                                            <p>{product.name} {product.price}元 x {product.amount}</p>
                                        </Col>
                                        <Col>
                                            <p className='text-end'>$ {product.total}</p>
                                        </Col>
                                    </Row>
                                ))
                            }
                            {/* <Row className='mb-3'>
                                <Col>
                                    <p>運費</p>
                                </Col>
                                <Col>
                                    <p className='text-end'>$ 100</p>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col className='mb-3' md={12} style={{ width: '100%', height: '1px', backgroundColor: '#ccc' }} />

                                <Col >
                                    <p>應付金額</p>
                                </Col>
                                <Col>
                                    <p className='list-title text-end' style={{ color: '#B88E2F' }}>$ {total}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button size="lg" className='mb-3 mt-5 checkOutButton' variant="outline-dark" onClick={() => { sendToCheckOut();  handleExternalSubmit()}}>
                                        <p style={{ textAlign: 'center' }}>下一步，輸入付款資訊</p>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    {/* 綠界 */}
                    <form ref={formRef} id="idFormAioCheckOut" method="post" action="http://localhost:80/ecpay_test/ECPay_CreateOrder.php" style={{ display: 'none' }}>
                        <label>
                            編號 (MerchantTradeNo):
                            <input type="text" name="MerchantTradeNo" value={ECPayDataObj.MerchantTradeNo} className="form-control" />
                            不可重複使用。英數字大小寫混合
                        </label>
                        <label className="col-xs-12">
                            時間 (MerchantTradeDate):
                            <input type="text" name="MerchantTradeDate" value={ECPayDataObj.MerchantTradeDate} className="form-control" />
                            yyyy/MM/dd HH:mm:ss
                        </label>
                        <label className="col-xs-12">
                            類型 (PaymentType):
                            <input type="text" name="PaymentType" value={ECPayDataObj.PaymentType} className="form-control" />
                            aio
                        </label>
                        <label className="col-xs-12">
                            (TotalAmount):
                            <input type="text" name="TotalAmount" value={ECPayDataObj.TotalAmount} className="form-control" />
                            請帶整數，不可有小數點 僅限新台幣 金額不可為 0 元 (最低限制為 30 元)
                        </label>
                        <label className="col-xs-12">
                            描述 (TradeDesc):
                            <input type="text" name="TradeDesc" value={ECPayDataObj.TradeDesc} className="form-control" />
                        </label>
                        <label className="col-xs-12">
                            名稱 (ItemName):
                            <input type="text" name="ItemName" value={ECPayDataObj.ItemName} className="form-control" />
                            商品名稱以符號 # 分
                        </label>
                        <label className="col-xs-12">
                            付款方式 (ChoosePayment):
                            <input type="text" name="ChoosePayment" value={ECPayDataObj.ChoosePayment} />
                            Credit:信用卡及 AndroidPay AndroidPay: AndroidPay  WebATM:網路 ATM ATM:自動櫃員機 CVS:超商代碼 BARCODE:超商條碼 ALL:不指定
                        </label>
                        {/* <button type="submit" className="btn btn-default">
                            綠界線上支付
                        </button> */}
                    </form>

                </Row>
            </Container>
        </Container>
    );
}

export default CheckOut;


