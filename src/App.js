import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
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
    console.log(this.state.city);
    //request to api -- data from state
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url);
    console.log(cityInfo.data[0]);
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
          {cityInfo}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Explore!</button>
        </form>
      </>
    );
  }}

export default App;
