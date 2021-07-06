import React,{Component} from 'react';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import './TextContainer.css'
const mapStyles = {
  width: '50%',
  height: '80%',
  margin: '0'
};
class TextContainer extends Component{
       constructor(props){
           super(props);
       this.state={
            name: "React",
           latitude:null,
           longitude:null,
           userAddress:null
       };
       this.getLocation = this.getLocation.bind(this);
       this.getCoordinates = this.getCoordinates.bind(this);
    }

     getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates,this.showerror);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
      getCoordinates(position){
          console.log(position.coords.latitude);
          this.setState({
               latitude:position.coords.latitude,
               longitude:position.coords.longitude
          })
      }
      showerror(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            
        }

      }
    render(){
        return(
            <div className="textContainer">
                <button onClick={this.getLocation}>Get Cordinate</button>
                <p>Lat: {this.state.latitude}</p>
                <p>Lon: {this.state.longitude}</p>
                <p>Address: {this.state.userAddress}</p>
                 <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
                
            </div>
        )
    }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZmqsFCP4hiXdgrwdESASBz8l99rhE82o'
})(TextContainer);