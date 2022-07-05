import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Card';


class Movie extends React.Component{

 render() {
  return (
    <Col className="">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Img variant="top" src={this.props.imageUrl}/>
        <Card.Text>
          {this.props.description}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
 }
}

export default Movie;