import React, { Component } from 'react';


export default class MapC extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }

  renderMap(props) {
    //setting constants
    const node = this.node
    const width = node.width.animVal.value
    const height = node.height.animVal.value
    const mapData = props.mapData
            
  }

  //run renderMap each time new props come in-d3 will determine whether to use enter/update/exit
  componentWillReceiveProps(nextProps) {
    if (nextProps.mapData.length) {
      this.renderMap(nextProps)
    }
  }

  //prevents react from re-rendering the component when new props come in, allows the d3 to take control through the renderMap function, run via componentWillReceiveProps
  shouldComponentUpdate() {
    return false;
  }

  //rendering the empty svg container is the only aspect React is responsible for
  //ref gives the renderMap function a reference to the DOM element (rather than the virtual DOM element) for d3 to manipulate directly
  render() {
    return (
      <h1 
      ref={node => this.node = node}
      width={this.props.width}
      height={this.props.height}
      onClick = {()=>this.props.onClick(undefined, this.node)}>  
      </h1>
    );
  }
}
