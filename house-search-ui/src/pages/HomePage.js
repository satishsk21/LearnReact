import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HouseList from '../components/HouseList';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import constants from '../components/Constants';

const loadHouses = (houses) => {
    return houses.map((house, key) => {
        return <Marker key={key} position={{
            lat: house.latitude,
            lng: house.longitude
        }}/>
    })
}

const HomePage = (props) => {
    const mapStyles = {
        width: '65%',
        height: '100%',
      };

    const [houseInfo, setHouseInfo] = useState({houses: []});

    useEffect(() => {
        const fetchData = async () => {            
            const result = await fetch(`/api/house`);
            const body = await result.json();
            console.log(body);
            setHouseInfo(body);            
        }

        fetchData();        
    }, []);    

    return (
        <>
            <h1>Houses</h1>
            <HouseList houses={houseInfo.houses} />
            <Link to="/add-house">
                <button className="btn btn-primary">
                    Add House
                </button>
            </Link>
            <Map
                google={props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: -33.8038060, lng: 150.9468740}}>

                {loadHouses(houseInfo.houses)}
            </Map>
            
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: constants.ApiKey
  })(HomePage);