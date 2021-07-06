import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Demo1 extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      lat: props.lat,
      long: props.long
    };
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 25.5787008,
            lng: 85.08538879999999
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZmqsFCP4hiXdgrwdESASBz8l99rhE82o'
})(Demo1);