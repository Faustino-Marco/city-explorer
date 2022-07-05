import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movie from './Movie';


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
      moviesArr: []


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
    let url = `${process.env.REACT_APP_SERVER}/movies?city=${city}`;
    let movieData = await axios.get(url);
    console.log(movieData.data);
    this.setState({
      moviesArr: movieData.data,
    })
  };

  handleWeatherRequest = async (city) => {
    let url = `${process.env.REACT_APP_SERVER}/weather?lat=${city.lat}&lon=${city.lon}`
    let weatherInfo = await axios.get(url);
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
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=10`;

      this.setState({
        cityInfo: cityInfo.data[0],
        cityMap: cityMap
      })
      this.handleWeatherRequest(cityInfo.data[0]);
      this.handleMovieRequest(this.state.city);
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}. Please refresh the page and try again.`
      });
    };
  };

  render() {
    let movies = this.state.moviesArr.map(
      (movie, idx) => (
        <Movie
          title={movie.title}
          description={movie.description}
          imageUrl={movie.src}
          key={idx}
        />
      )
    );
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
          <>
            <ListGroup>
              <ListGroup.Item>{'City: ' + this.state.cityInfo.display_name}</ListGroup.Item>
              <ListGroup.Item>{`Latitude:  ${this.state.cityInfo.lat}`}</ListGroup.Item>
              <ListGroup.Item>{`Longitude: ${this.state.cityInfo.lon}`}</ListGroup.Item>
              <hr></hr>
              <ListGroup.Item>Forecast:</ListGroup.Item>
              <ListGroup.Item>{`${this.state.dayOneDateTime}: ${this.state.dayOneDescription}`}</ListGroup.Item>
              <ListGroup.Item>{`${this.state.dayTwoDateTime}: ${this.state.dayTwoDescription}`}</ListGroup.Item>
              <ListGroup.Item>{`${this.state.dayThreeDateTime}: ${this.state.dayThreeDescription}`}</ListGroup.Item>
              <Image src={this.state.cityMap}></Image>
              <hr></hr>
            </ListGroup>
            <Container>
              <Row lg={4}>
                {movies}
              </Row>
            </Container>
          </>
        }
      </>
    );
  }
}

export default App;


