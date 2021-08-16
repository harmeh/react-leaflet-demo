<<<<<<< HEAD
import React from 'react';
import './index.css';


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
  LayerGroup,
  Circle,
  Rectangle,
  FeatureGroup,
  GeoJSON,
  LayersControl,
} from 'react-leaflet';


import 'leaflet-draw';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';



import { useState } from 'react';


//dummy data
import datas from '../../data/data.json';
console.log(datas);



interface MapComponentProps extends MapContainerProps {
  MouseOnClickLayer?: Function;
  GeoJSONData?: any;
  CircleData?: any;
}

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapComponent = (props: MapComponentProps) => {
  const {
    children,
    center = { lat: -76.661343, lng: 45.680374 },
    MouseOnClickLayer,
    GeoJSONData,
    CircleData,
  } = props;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  //--------------------------GeoJSON---Start-------------------

  const GeoJSONStyle = {
    fillColor: "blue",
    fillOpacity: 0.15,
  };

  const MouseOverLayer = (e: any) => {
    if (e.target.options.fill) {
      e.target.setStyle({
        fillColor: "red",
      });
    }
  };

  const MouseOutLayer = (e: any) => {
    if (e.target.options.fill) {
      e.target.setStyle({
        fillColor: "blue",
      });
    }
  };

  const onEachCountry = (province: any, layer: any) => {
    const ProvinceName = province.properties.title;
    console.log("gogo---onEachCountry", ProvinceName);
    layer.bindPopup(`${ProvinceName}`);

    layer.on({
      // click: MouseOnClickLayer,
      mouseover: MouseOverLayer,
      mouseout: MouseOutLayer,
    });
  };

  //--------------------------GeoJSON---End-------------------




  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ minHeight: '80vh' }}
      {...props}
    >
      <LayersControl position='bottomleft'>

        <LayersControl.BaseLayer checked name='mapbox.default'>
          <TileLayer
            // tileSize={256}
            // opacity={0.5}
            // maxZoom={25}
            // maxNativeZoom={10}
            noWrap={true}
            bounds={L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))}
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='mapbox.satellite'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4jlnts68kq18nn3ni2gepu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.monochrome.sky'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kj86s7n7y17pem4wk52p7/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.monochrome.light'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kt8rm4zbd17pdzofjyerc/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.street'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4knmh84jk518o4au62jyuk/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.outdoors'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4korjx0fa417n3u52k318n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='mapbox.navigation.day'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4krhj369pg18nnjryshype/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.navigation.night'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kq2rk4je617mvymn238pu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OpenStreetMap.Mapnik'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OpenTopoMap'>
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.AlidadeSmooth'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.AlidadeSmoothDark'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.OSMBright'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        











        <LayersControl.BaseLayer name='OpenStreetMap Standard tile layer'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Humanitarian focused OSM base layer'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OSM France'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs Hike Bike'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs Hillshading'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs OSM B&W'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs OSM no labels'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Thunderforest Landscape'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Öpnvkarte Transport map'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='soviet military topo'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.bbbike.org/cgi-bin/tapp/tilecache.py/1.0.0/topomapper_v2/{z}/{x}/{y}.jpg'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='here WeGo satellite.day 256'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=xWVIueSv6JL0aJ5xqTxb&token=djPZyynKsbTjIUDOBcHZ2g&lg=ENG'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='here WeGo satellite.day 512'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/512/png8?app_id=xWVIueSv6JL0aJ5xqTxb&token=djPZyynKsbTjIUDOBcHZ2g&lg=ENG'
          />
        </LayersControl.BaseLayer>












        {GeoJSONData ? (
          <GeoJSON
            onEachFeature={onEachCountry}
            // attribution="&copy; credits due..."
            data={GeoJSONData}
            style={GeoJSONStyle}
          />
        ) : null}






        {CircleData ? (
          <LayerGroup>
            {CircleData.map((item: any) => (
              <Circle
                center={[item.lat, item.long]}
                pathOptions={{
                  color: item.color,
                  fillColor: item.fillColor,
                  opacity: 1,
                }}
                radius={item.circleSize}
              />
            ))}
          </LayerGroup>
        ) : null}




        {children}





        {datas ? datas.map(data => (
          <Marker
            key={data.properties.PARK_ID}
            position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )) : null}






        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: 'blue' }}
              radius={200}
            />
            <Circle
              center={center}
              pathOptions={{ fillColor: 'red' }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: 'green', fillColor: 'green' }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>




        <LayersControl.Overlay checked name="Feature group">
          <FeatureGroup pathOptions={{ color: 'purple' }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
            <Rectangle bounds={[
              [51.49, -0.08],
              [51.5, -0.06],
            ]} />
          </FeatureGroup>
        </LayersControl.Overlay>







      </LayersControl>
    </MapContainer>
  );
};


=======
import React from 'react';
import './index.css';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
  LayerGroup,
  Circle,
  Rectangle,
  FeatureGroup,
  GeoJSON,
  LayersControl,
} from 'react-leaflet';

import 'leaflet-draw';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

import { useState } from 'react';

//dummy data
import datas from '../../data/data.json';
console.log(datas);




interface MapComponentProps extends MapContainerProps {
  MouseOnClickLayer?: Function;
  GeoJSONData?: any;
  CircleData?: any;
}

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapComponent = (props: MapComponentProps) => {
  const {
    children,
    center = { lat: -76.661343, lng: 45.680374 },
    MouseOnClickLayer,
    GeoJSONData,
    CircleData,
  } = props;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  //--------------------------GeoJSON---Start-------------------

  const GeoJSONStyle = {
    fillColor: "blue",
    fillOpacity: 0.15,
  };

  const MouseOverLayer = (e: any) => {
    if (e.target.options.fill) {
      e.target.setStyle({
        fillColor: "red",
      });
    }
  };

  const MouseOutLayer = (e: any) => {
    if (e.target.options.fill) {
      e.target.setStyle({
        fillColor: "blue",
      });
    }
  };

  const onEachCountry = (province: any, layer: any) => {
    const ProvinceName = province.properties.title;
    console.log("gogo---onEachCountry", ProvinceName);
    layer.bindPopup(`${ProvinceName}`);

    layer.on({
      // click: MouseOnClickLayer,
      mouseover: MouseOverLayer,
      mouseout: MouseOutLayer,
    });
  };

  //--------------------------GeoJSON---End-------------------
















  




  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ minHeight: '80vh' }}
      {...props}
    >
      <LayersControl position='bottomleft'>

        <LayersControl.BaseLayer checked name='mapbox.default'>
          <TileLayer
            // tileSize={256}
            // opacity={0.5}
            // maxZoom={25}
            // maxNativeZoom={10}
            noWrap={true}
            bounds={L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))}
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='mapbox.satellite'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4jlnts68kq18nn3ni2gepu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.monochrome.sky'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kj86s7n7y17pem4wk52p7/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.monochrome.light'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kt8rm4zbd17pdzofjyerc/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.street'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4knmh84jk518o4au62jyuk/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.outdoors'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4korjx0fa417n3u52k318n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='mapbox.navigation.day'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4krhj369pg18nnjryshype/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='mapbox.navigation.night'>
          <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/harmeh/cks4kq2rk4je617mvymn238pu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFybWVoIiwiYSI6ImNrczRqZXpuYjJvamgycHM3ZDBvZXg3emgifQ.S_K-_vd_NBq9eZeXkLkReA'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OpenStreetMap.Mapnik'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OpenTopoMap'>
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.AlidadeSmooth'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.AlidadeSmoothDark'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Stadia.OSMBright'>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
          />
        </LayersControl.BaseLayer>

        











        <LayersControl.BaseLayer name='OpenStreetMap Standard tile layer'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Humanitarian focused OSM base layer'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='OSM France'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs Hike Bike'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs Hillshading'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs OSM B&W'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name='wmflabs OSM no labels'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Thunderforest Landscape'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Öpnvkarte Transport map'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='soviet military topo'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.bbbike.org/cgi-bin/tapp/tilecache.py/1.0.0/topomapper_v2/{z}/{x}/{y}.jpg'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='here WeGo satellite.day 256'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=xWVIueSv6JL0aJ5xqTxb&token=djPZyynKsbTjIUDOBcHZ2g&lg=ENG'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='here WeGo satellite.day 512'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/512/png8?app_id=xWVIueSv6JL0aJ5xqTxb&token=djPZyynKsbTjIUDOBcHZ2g&lg=ENG'
          />
        </LayersControl.BaseLayer>





        {GeoJSONData ? (
          <GeoJSON
            onEachFeature={onEachCountry}
            // attribution="&copy; credits due..."
            data={GeoJSONData}
            style={GeoJSONStyle}
          />
        ) : null}






        {CircleData ? (
          <LayerGroup>
            {CircleData.map((item: any) => (
              <Circle
                center={[item.lat, item.long]}
                pathOptions={{
                  color: item.color,
                  fillColor: item.fillColor,
                  opacity: 1,
                }}
                radius={item.circleSize}
              />
            ))}
          </LayerGroup>
        ) : null}




        {children}





        {datas ? datas.map(data => (
          <Marker
            key={data.properties.PARK_ID}
            position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )) : null}






        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: 'blue' }}
              radius={200}
            />
            <Circle
              center={center}
              pathOptions={{ fillColor: 'red' }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: 'green', fillColor: 'green' }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>




        <LayersControl.Overlay checked name="Feature group">
          <FeatureGroup pathOptions={{ color: 'purple' }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
            <Rectangle bounds={[
              [51.49, -0.08],
              [51.5, -0.06],
            ]} />
          </FeatureGroup>
        </LayersControl.Overlay>







      </LayersControl>
    </MapContainer>
  );
};


>>>>>>> cacff8498edec75898b64c7c509382792e5a5bb5
export default MapComponent;