import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


const Footer = () => {
  return (
    
    <Container style= {{ backgroundColor: 'rgb(35,31,32)' }} >
    <Row>

    <Col>

  	<Nav style= {{ backgroundColor: 'rgb(35,31,32)' }} activeKey="/home" className="flex-column" onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
  		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }} href="/home">Active</Nav.Link>
  		</Nav.Item>
  		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }}  eventKey="link-1">About</Nav.Link>
  		</Nav.Item>
  		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }} eventKey="link-2">Link</Nav.Link>
  		</Nav.Item>
  		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }} eventKey="link-2">Team</Nav.Link>
  		</Nav.Item>
  		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }} eventKey="link-2">Careers</Nav.Link>
  		</Nav.Item>
		<Nav.Item>
    		<Nav.Link style = {{ color: 'rgb(255,255,255)' }} eventKey="disabled" disabled>Disabled</Nav.Link>
  		</Nav.Item>
    </Nav>
    </Col>
    <Col> <img src={require('./socialmedia.png')} alt="socialmedia"/> </Col>
   </Row>
   </Container>

  )
 }


 export default Footer;