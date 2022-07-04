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
      errorMessage: '',
      dayOneDateTime: '',
      dayOneDescription: '',
      dayTwoDateTime: '',
      dayTwoDescription: '',
      dayThreeDateTime: '',
      dayThreeDescription: '',
      

    }
  };

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleMovieRequest = async (city) => {
    console.log('movie');
    console.log(city);
    let url = `${process.env.REACT_APP_SERVER}/movies?city=${city}`;
    let movieData = await axios.get(url);
    console.log(movieData);
    this.setState({
      moviesArr: movieData,
    })
  };

  handleWeatherRequest = async (city) => {
    console.log('weather');
    let url = `${process.env.REACT_APP_SERVER}/weather?lat=${city.lat}&lon=${city.lon}`
    let weatherInfo = await axios.get(url);
    console.log(weatherInfo);
    this.setState({
      dayOneDateTime: weatherInfo.data[0].dateTime,
      dayOneDescription: weatherInfo.data[0].description,
      dayTwoDateTime: weatherInfo.data[1].dateTime,
      dayTwoDescription: weatherInfo.data[1].description,
      dayThreeDateTime: weatherInfo.data[2].dateTime,
      dayThreeDescription: weatherInfo.data[2].description,

    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // console.log(this.state.city);
      //request to api -- data from state
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);
      console.log(cityInfo);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=10`;
      // console.log(cityMap);

      this.setState({
        cityInfo: cityInfo.data[0],
        cityMap: cityMap
      })
      this.handleWeatherRequest(cityInfo.data[0]);
      this.handleMovieRequest(this.state.city);
      console.log(this.state.city);
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
            <ListGroup.Item>{`Latitude:  ${this.state.cityInfo.lat}`}</ListGroup.Item>
            <ListGroup.Item>{`Longitude: ${this.state.cityInfo.lon}`}</ListGroup.Item>
            <ListGroup.Item>{`${this.state.dayOneDateTime}: ${this.state.dayOneDescription}`}</ListGroup.Item>
            <ListGroup.Item>{`${this.state.dayTwoDateTime}: ${this.state.dayTwoDescription}`}</ListGroup.Item>
            <ListGroup.Item>{`${this.state.dayThreeDateTime}: ${this.state.dayThreeDescription}`}</ListGroup.Item>
            <Image src={this.state.cityMap}></Image>
          </ListGroup>
        }
          <ul>
            <li></li>
          </ul>
      </>
    );
  }
}

export default App;
