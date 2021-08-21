import React, { Component } from 'react';
import { MapC, Map2C, MapContainer, TestC } from "./components";


class App extends Component {
  
  state = {
    center : {
      lat: Math.random()*90,
      lng: Math.random()*90,
    },
    zoom : Math.random()*18,
  };

  
  switchHandler = (newZoom: number) =>{
    console.log('switchHandler was launched!');
    this.setState({
      center : {
        lat: 38.0798882,
        lng: 46.2895839
      },
      zoom : newZoom,
    })
  };


  zoomChangeHandler = (event: { target: { value: number; }; }) =>{
    console.log('zoomChangeHandler was launched!');
    this.setState({
      zoom : event.target.value,
    })
  };

  render() {
    return (
      <>

        <TestC
          key={Math.random()}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng,
          }}
          zoom = {this.state.zoom}
          onClick = {this.switchHandler.bind(this, 17)}
          onChange = {this.zoomChangeHandler}
        ></TestC>



        <MapContainer
          key={Math.random()}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng,
          }}
          zoom = {this.state.zoom}
        ></MapContainer>


        <h1>Map2C</h1>
        <Map2C
          key={Math.random()}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng,
          }}
          zoom = {this.state.zoom}
        ></Map2C>


        <h1>MapC</h1>
        <MapC
          key={Math.random()}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng,
          }}
          zoom = {this.state.zoom}
        ></MapC>

      </>
    )
  }
}

export default App;
