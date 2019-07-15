/*global google*/
import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
import constants from './Constants';

const  getMode = (directionMode) => {
    switch(directionMode)
    {
        case "driving":
            return google.maps.TravelMode.DRIVING;

        case "walking":
            return google.maps.TravelMode.WALKING;

        default: 
            return google.maps.TravelMode.DRIVING;
    }
    
}
class MyMapComponent extends React.Component {
 
render() {
    const DirectionsComponent = compose(
      withProps({
        originLat: this.props.originLat,
        originLng: this.props.originLng,
        destLat: this.props.destLat,
        destLng: this.props.destLng,
        directionMode: this.props.directionMode,
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+constants.ApiKey,
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `600px`, width: `600px` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(this.props.originLat, this.props.originLng),
                destination: new google.maps.LatLng(this.props.destLat, this.props.destLng),
                travelMode: getMode(this.props.directionMode),
              }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
    this.setState({
                    directions: {...result},
                    markers: true
                  })
                } else {
                  console.error(`error fetching directions ${result}`);
                }
              });
        }
      })
    )(props =>
        <>
            <div>
                {props.directions && <span>Distance: {props.directions.routes[0].legs[0].distance.text}, Duration: {props.directions.routes[0].legs[0].duration.text}</span>}
            </div>
            <GoogleMap defaultZoom={3}>
                {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
            </GoogleMap>            
        </>
    );
return (
        <DirectionsComponent />
    )
  }
}

export default MyMapComponent

// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// ))
// return(<MyMapComponent isMarkerShown />)

// export default MyMapComponent