import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import './index.css';
import axios from 'axios';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';


export class Farms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            showZipCode: false
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    handleFarmSearch = async (zipcode) => {
        const BASE_URL = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipcode; 

        try {
            const res = await axios.get(BASE_URL);
            const farms = res.data.results;
            let marketdetails = [];
            for (let farm of farms) {
                let details = await this.getDetailedFarmInfo(farm.id);
                marketdetails.push(details);
            }
            return marketdetails;
        } catch (e) {
            console.error(e);
        }                
    }

    getDetailedFarmInfo = async (id) => {
        const BASE_URL = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id;

        try {
            const res = await axios.get(BASE_URL);
            return res.data.marketdetails;
        } catch (e) {
            console.error(e);
        }
    }

    getLocations = async (zipcode) => {
        let marketdetails = await this.handleFarmSearch(zipcode);
        let markers = [];
        for (let farm of marketdetails) {
            let indLon = farm.GoogleLink.indexOf("%2C%20");
            let indLat = farm.GoogleLink.indexOf("?q=");
            let lon = farm.GoogleLink.substring(indLon + 6, indLon + 13);
            let lat = farm.GoogleLink.substring(indLat + 3, indLat + 10);

            let name = <div><div>{farm.Address}</div>
                        <div style={{fontSize: '10px', fontWeight: '300'}}>{farm.Products}</div>
                        </div>

            markers.push(<Marker name={name} 
                                position={{lat: lat, lng: lon}} 
                                onClick={this.onMarkerClick}>
                <InfoWindow marker={this.state.activeMarker} 
                            visible={this.state.showingInfoWindow}>
                    <div><h1>{this.state.selectedPlace.name}</h1></div>
                </InfoWindow>
            </Marker>)
        }

        this.setState({markers: markers});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocations(this.refs.zipcode.value);
        this.setState({showZipCode: true});
    }

    render() {
        return (   
            <div style={{textAlign: 'center', marginTop: '40px'}}>
                <div style={{width: '50%', margin: '0 auto'}}>
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Zip Code..." ref="zipcode"/>
                        </Form.Group>
                    </Form>
                </div>
                {this.state.showZipCode &&
                <Map 
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    style={{width: '700px', height: '500px', margin: '0 auto'}}
                    zoom={12}
                    initialCenter={{
                        lat: 42.3736,
                        lng: -71.1097
                    }}
                >{this.state.markers}
                <InfoWindow marker={this.state.activeMarker} 
                                visible={this.state.showingInfoWindow}>
                        <div><h6>{this.state.selectedPlace.name}</h6></div>
                </InfoWindow>
                </Map>
                }
            </div>             
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAjLkTo8Pl1lhIhIGdisIlkzqJq_HScqB4'
})(Farms);


