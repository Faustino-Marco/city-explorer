import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityInfo: {},
      cityMap: '',
      errorMessage: ''

    }
  };

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value,
    });
    console.log(e.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {

      console.log(this.state.city);
      //request to api -- data from state
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=10`;
      console.log(cityMap);

      this.setState({
        cityInfo: cityInfo.data[0],
        cityMap: cityMap,
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}. Please refresh the page and try again.`
      });
    };
  };

  render() {
    return (
      <>
        <h1>Ready to Explore?</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label column="lg" lg={2}><p>Pick a City:</p>
            <input onChange={this.handleCityInput} type="text" />
          </Form.Label>
          <Button type="submit">Explore!</Button>
        </Form>
        {this.state.error ? <Alert variant="danger">{this.state.errorMessage}</Alert> :
          <ListGroup>
            <ListGroup.Item>{'City Name: ' + this.state.cityInfo.display_name}</ListGroup.Item>
            <ListGroup.Item>{'Latitude: ' + this.state.cityInfo.lat}</ListGroup.Item>
            <ListGroup.Item>{'Longitude: ' + this.state.cityInfo.lon}</ListGroup.Item>
            <Image src={this.state.cityMap}></Image>
          </ListGroup>
        }
      </>
    );
  }
}

export default App;
