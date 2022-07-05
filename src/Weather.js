import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

class Weather extends React.Component {

  render() {
    return (
      <>
      <ListGroup.Item key={this.props.dagger}>{this.props.dateTime}</ListGroup.Item>
      <ListGroup.Item>{this.props.description}</ListGroup.Item>
        {/* <ListGroup.Item>{'City: ' + this.state.cityInfo.display_name}</ListGroup.Item>
        <ListGroup.Item>{`Latitude:  ${this.state.cityInfo.lat}`}</ListGroup.Item>
        <ListGroup.Item>{`Longitude: ${this.state.cityInfo.lon}`}</ListGroup.Item>
        <hr></hr>
        <ListGroup.Item>Forecast:</ListGroup.Item>
        <ListGroup.Item>{`${this.state.dayOneDateTime}: ${this.state.dayOneDescription}`}</ListGroup.Item>
        <ListGroup.Item>{`${this.state.dayTwoDateTime}: ${this.state.dayTwoDescription}`}</ListGroup.Item>
        <ListGroup.Item>{`${this.state.dayThreeDateTime}: ${this.state.dayThreeDescription}`}</ListGroup.Item>
        <Image src={this.state.cityMap}></Image> */}
        <hr></hr>

      </>
    )
  }
}

export default Weather;