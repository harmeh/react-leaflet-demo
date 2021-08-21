import React from 'react'
// import MapC from './MapC'



const TestC = (props) => {

  return (
    <div>
      <h1>TestC</h1>
      <h2>lat {props.center.lat}</h2>
      <h2>lng {props.center.lng}</h2>
      <h2>zoom {props.zoom}</h2>
      
      <input
      type="text"
      onChange={props.onChange}
      value={props.zoom}/>

      <button onClick={props.onClick}>Switch</button>
    </div>
  )

}


export default TestC;