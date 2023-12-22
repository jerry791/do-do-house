import '../css/homepage.css';
import { Container, Row, Col, Image  } from 'react-bootstrap';
function ChatBot() {
    return (
        <Container style={{position:'absolute',bottom:'20px',right:'12px'}}>
            <Row>
                <Col md={11}/>
                <Col md={1} style={{display:'flex',justifyContent:'flex-end',zIndex:300}}>
                    <a href="https://lin.ee/WiU2gbWj" >
                        <Image style={{width:'60px',height:'60px'}} src="img/line-icon.png" alt="加入好友" height="36" border="0"/>
                    </a>
                </Col>
            </Row>
        </Container>

    );
}

export default ChatBot;
