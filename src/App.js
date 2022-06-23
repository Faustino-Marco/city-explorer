import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityInfo: {},
      cityMap: '',
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
        <h1>City Explorer</h1>
        <p>Search for a city: </p>
        <form onSubmit={this.handleCityInput}>
          <input type="text" onInput={this.handleCityInput}></input>
        </form>
        <ul>
          <li>{'City Name: ' + this.state.cityInfo.display_name}</li>
          <li>{'Latitude: ' + this.state.cityInfo.lat}</li>
          <li>{'Longitude: ' + this.state.cityInfo.lat}</li>
        <Image src={this.state.cityMap}></Image>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Explore!</button>
        </form>
      </>
    );
  }
}

export default App;
