import React from 'react'
import Map2C from "../Map2C/Map2C";


const MapContainer = (props) => {
  return (
    <div>
      <h1>imported Map2C into MapContainer</h1>
      <Map2C
        key={Math.random()}
        center={{
          lat: props.center.lat,
          lng: props.center.lng,
        }}
        zoom = {props.zoom}
      ></Map2C>
    </div>
  )
}

export default MapContainer;