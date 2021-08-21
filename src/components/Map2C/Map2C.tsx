import './index.scss';
import React, { useEffect } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import './Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.js';
import './Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.css';


import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';


// @ts-ignore
const Map2C = (props) => {


  // @ts-ignore
  let mapContainer;



  useEffect(() => {
    const initialState = {
      lat: props.center.lat,
      lng: props.center.lng,
      zoom: props.zoom
    };




    // custom icon  ------------------------------------------------------
    const MyIcon = L.Icon.extend({
      options: {
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize:     [25, 41],
        shadowSize:   [41, 41],
        iconAnchor:   [12.5, 40],
        shadowAnchor: [12.5, 40],
        popupAnchor: [-3, -76]
      }
    });
    // @ts-ignore
    const myIcon = new MyIcon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png'});







    let polylineMeasureOptions = {
      position: 'topleft',            // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
      unit: 'metres',                 // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
      clearMeasurementsOnStop: true,  // Clear all the measurements when the control is unselected
      showBearings: false,            // Whether bearings are displayed within the tooltips
      bearingTextIn: 'In',            // language dependend label for inbound bearings
      bearingTextOut: 'Out',          // language dependend label for outbound bearings
      tooltipTextFinish: 'Click to <b>finish line</b><br>',
      tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
      tooltipTextMove: 'Click and drag to <b>move point</b><br>',
      tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
      tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
      // language dependend labels for point's tooltips
      measureControlTitleOn: 'Turn on PolylineMeasure',   // Title for the control going to be switched on
      measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the control going to be switched off
      measureControlLabel: '&#8614;', // Label of the Measure control (maybe a unicode symbol)
      measureControlClasses: [],      // Classes to apply to the Measure control
      showClearControl: false,        // Show a control to clear all the measurements
      clearControlTitle: 'Clear Measurements', // Title text to show on the clear measurements control button
      clearControlLabel: '&times',    // Label of the Clear control (maybe a unicode symbol)
      clearControlClasses: [],        // Classes to apply to clear control button
      showUnitControl: false,         // Show a control to change the units of measurements
      distanceShowSameUnit: false,    // Keep same unit in tooltips in case of distance less then 1 km/mi/nm
      unitControlTitle: {             // Title texts to show on the Unit Control button
        text: 'Change Units',
        metres: 'metres',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
      },
      unitControlLabel: {             // Unit symbols to show in the Unit Control button and measurement labels
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'mi',
        nauticalmiles: 'nm'
      },
      tempLine: {                     // Styling settings for the temporary dashed line
        color: '#00f',              // Dashed line color
        weight: 2                   // Dashed line weight
      },
      fixedLine: {                    // Styling for the solid line
        color: '#006',              // Solid line color
        weight: 2                   // Solid line weight
      },
      startCircle: {                  // Style settings for circle marker indicating the starting point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#0f0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
      },
      intermedCircle: {               // Style settings for all circle markers between startCircle and endCircle
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#ff0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
      },
      currentCircle: {                // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f0f',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
      },
      endCircle: {                    // Style settings for circle marker indicating the last point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f00',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
      },
    };








    // data ------------------------------------------------------
    const littleton = L.marker([39.61, -105.02], {icon: myIcon}).bindPopup('This is Littleton, CO.');
    const denver = L.marker([39.74, -104.99], {icon: myIcon}).bindPopup('This is Denver, CO.');
    const aurora = L.marker([39.73, -104.8], {icon: myIcon}).bindPopup('This is Aurora, CO.');
    const golden = L.marker([39.77, -105.23], {icon: myIcon}).bindPopup('This is Golden, CO.');

    const cities = L.layerGroup([littleton, denver, aurora, golden]);

    const overlayMaps = {
      'Cities': cities
    };







    // base map ------------------------------------------------------
    const openStreetMapMapnik = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        id: 'openStreetMapMapnik',
        // tileSize: 512,
        // zoomOffset: -1,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    );

    const oSMFrance = L.tileLayer(
      'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      {
        id: 'OSM France',
        // tileSize: 512,
        // zoomOffset: -1,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    );

    const baseMaps = {
      'open Street Map Mapnik': openStreetMapMapnik,
      '<span style="color: gray">OSM France</span>': oSMFrance,
    };




    // initialize map ------------------------------------------------------
    // @ts-ignore
    const map = L.map(mapContainer, {
      center: [initialState.lat, initialState.lng],
      zoom: initialState.zoom,
      layers: [openStreetMapMapnik, cities]
    });

    // @ts-ignore
    L.control.polylineMeasure(polylineMeasureOptions).addTo(map);

    // @ts-ignore
    map.addControl(new L.Control.Fullscreen());

    L.control.layers(baseMaps, overlayMaps, { position: 'bottomleft' }).addTo(map);


  }, [mapContainer]);










  return (
    // @ts-ignore
    <div className='map-container' ref={el => mapContainer = el}></div>
  )

}

export default Map2C;