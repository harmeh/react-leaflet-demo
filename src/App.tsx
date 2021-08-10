import React from 'react';
import { MapC } from "./components";


function App() {
  return (
    <MapC
      key={Math.random()}
      center={{ lat: 45.3 , lng: -75.6 }}
      zoom={10}
    ></MapC>
  );
}

export default App;
