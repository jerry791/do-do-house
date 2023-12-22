import '../css/check-out.css';
import IP_Path from './IP';
import { Button, Form, Container, Row, Col, Nav, Navbar, Breadcrumb, ListGroup } from 'react-bootstrap';
function CheckOut(prop) {
    //需要一次發送所有購物車ID
    var data = {
        name:'王小明',
        number:'0912345678',
        email:'jerry12345@gmail.com'
      };
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
      // product:找特定商品
      fetch(IP_Path+'check', {
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
                                        <p style={{ textAlign: 'center' }}>確認付款內容</p>
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

// import React, { useState } from 'react';

// const YourComponent = () => {
//     const currentDate = new Date();
//     const formattedDate = formatDate(currentDate);
//     const [formData, setFormData] = useState({
//         MerchantTradeNo: "",//頭要加上dodohouse
//         MerchantTradeDate: formattedDate,
//         PaymentType: 'aio',
//         TotalAmount: '321',
//         TradeDesc: '產品描述',
//         ItemName: '',
//         ChoosePayment: 'Credit',
//     });
//     // 設定訂單亂碼
//     function generateRandomCode() {
//         const randomCode = Math.floor(1000000 + Math.random() * 9000000); // 產生七位數亂碼
//         return String(randomCode);
//       }
//     // 設定時間格式
//     function formatDate(date) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的，因此要加 1
//         const day = String(date.getDate()).padStart(2, '0');
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         const seconds = String(date.getSeconds()).padStart(2, '0');
      
//         return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
//       }
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const params = new URLSearchParams(formData);//查詢URL串
//             const response = await fetch('http://localhost:80/ecpay_test/ECPay_CreateOrder.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: params.toString(),
//             });

//             if (response.ok) {
//                 console.log('Form data submitted successfully!');
//                 console.log(params);
//                 // window.location.href = 'http://localhost:80/ecpay_test/ECPay_CreateOrder.php';
//             } else {
//                 console.error('Form submission failed.');
//             }
//         } catch (error) {
//             console.error('Error during form submission:', error);
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     return (
//         <html>
//             <head>
//                 <meta charSet="UTF-8" />
//                 <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
//                 <title></title>
//                 <style>
//                     {`
//             label {
//               display: block;
//             }
//           `}
//                 </style>
//             </head>
//             <body>
//                 <form id="idFormAioCheckOut" method="post" action="http://localhost:80/ecpay_test/ECPay_CreateOrder.php">
//                     <label>
//                         編號 (MerchantTradeNo):
//                         <input type="text" name="MerchantTradeNo" value={formData.MerchantTradeNo} onChange={handleInputChange} className="form-control" />
//                         不可重複使用。英數字大小寫混合
//                     </label>
//                     <label className="col-xs-12">
//                         時間 (MerchantTradeDate):
//                         <input type="text" name="MerchantTradeDate" value={formData.MerchantTradeDate} onChange={handleInputChange} className="form-control" />
//                         yyyy/MM/dd HH:mm:ss
//                     </label>
//                     <label className="col-xs-12">
//                         類型 (PaymentType):
//                         <input type="text" name="PaymentType" value={formData.PaymentType} onChange={handleInputChange} className="form-control" />
//                         aio
//                     </label>
//                     <label className="col-xs-12">
//                         (TotalAmount):
//                         <input type="text" name="TotalAmount" value={formData.TotalAmount} onChange={handleInputChange} className="form-control" />
//                         請帶整數，不可有小數點 僅限新台幣 金額不可為 0 元 (最低限制為 30 元)
//                     </label>
//                     <label className="col-xs-12">
//                         描述 (TradeDesc):
//                         <input type="text" name="TradeDesc" value={formData.TradeDesc} onChange={handleInputChange} className="form-control" />
//                     </label>
//                     <label className="col-xs-12">
//                         名稱 (ItemName):
//                         <input type="text" name="ItemName" value={formData.ItemName} onChange={handleInputChange} className="form-control" />
//                         商品名稱以符號 # 分
//                     </label>
//                     <label className="col-xs-12">
//                         付款方式 (ChoosePayment):
//                         <input type="text" name="ChoosePayment" value={formData.ChoosePayment} onChange={handleInputChange} />
//                         Credit:信用卡及 AndroidPay AndroidPay: AndroidPay  WebATM:網路 ATM ATM:自動櫃員機 CVS:超商代碼 BARCODE:超商條碼 ALL:不指定
//                     </label>
//                     <button type="submit" className="btn btn-default">
//                         綠界線上支付
//                     </button>
//                 </form>
//             </body>
//         </html>
//     );
// };

// export default YourComponent;
