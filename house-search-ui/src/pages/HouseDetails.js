import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyMapComponent from '../components/MyMapComponent';

const HouseDetails = (props) => {
    const [directionMode, setDirectionMode] = useState('');
    const [destinationLat, setDestinationLat] = useState(0);
    const [destinationLng, setDestinationLng] = useState(0);

    const [stationLat, setStationLat] = useState(0);
    const [stationLng, setStationLng] = useState(0);
    const [schoolLat, setSchoolLat] = useState(0);
    const [schoolLng, setSchoolLng] = useState(0);

    const setDestinationDetails = (lat, lng) => {
        setDestinationLat(lat);
        setDestinationLng(lng);
    }

    const mapStyles = {
        width: '65%',
        height: '100%',
      };
    const id = props.match.params.id;
    console.log("id value: " + id);
    const [houseInfo, setHouseInfo] = useState({
        address: {
            line1: '',
            line2: '',
            suburb: '',
            postcode: '',
            state: ''
        },
        stations: [{
                name: '',
                latitude: 0,
                longitude: 0
            }],
        schools: [{
            name: '',
            latitude: 0,
            longitude: 0
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/house/${id}`);
            const body = await result.json();
            setHouseInfo(body); 
            
            if (body.stations) {
                setDestinationLat(body.stations[0].latitude);
                setDestinationLng(body.stations[0].longitude);

                setStationLat(body.stations[0].latitude);
                setStationLng(body.stations[0].longitude);
            }

            if (body.schools) {
                setSchoolLat(body.schools[0].latitude);
                setSchoolLng(body.schools[0].longitude);
            }
        }
        fetchData();

        
    }, [id]);

        return (
        <>
            <h1>House Details</h1>
            <Link to="/">
                <span>Houses</span>
            </Link>
            <span>/Details</span>
            <div className="address-section">
                <p>{houseInfo.address.line1} {houseInfo.address.line2}</p>
                <p>{houseInfo.address.suburb}</p>
                <p>{houseInfo.address.state} {houseInfo.address.postcode}</p>
            </div>
            <div className="public-amenities">
                <input type="radio" name="amenity-type" value="station" onChange={(event) => setDestinationDetails(stationLat, stationLng)} defaultChecked /> Station
                <input type="radio" name="amenity-type" value="school" onChange={(event) => setDestinationDetails(schoolLat, schoolLng)} /> School               
            </div>
            <div className="public-amenities">
                <input type="radio" name="direction-mode" value="driving" onChange={(event) => setDirectionMode(event.target.value)} defaultChecked /> Driving
                <input type="radio" name="direction-mode" value="walking" onChange={(event) => setDirectionMode(event.target.value)} /> Walking               
            </div>

            {/* <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} destLat={-33.801750} detLng={150.955970} /> */}
            {/* <MyMapComponent originLat={41.8507300} originLng={-87.6512600} destLat={41.8525800} detLng={-87.6514100} /> */}
            {/* if (houseInfo.stations[0].latitude !== 0) {
                <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} 
                destLat={houseInfo.stations[0].latitude} destLng={houseInfo.stations[0].longitude} />    
            }
            else {
                <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} 
                destLat={houseInfo.latitude} destLng={houseInfo.longitude} />    
            } */}

            {/* { houseInfo.stations[0].latitude !== 0 ? <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} destLat={houseInfo.stations[0].latitude} destLng={houseInfo.stations[0].longitude} /> : <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} destLat={houseInfo.latitude} destLng={houseInfo.longitude} /> } */}
            {/* <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} 
                    destLat={houseInfo.stations ? houseInfo.stations[0].latitude : houseInfo.latitude} destLng={houseInfo.stations ? houseInfo.stations[0].longitude : houseInfo.longitude} />     */}
           
           <MyMapComponent originLat={houseInfo.latitude} originLng={houseInfo.longitude} 
                    destLat={destinationLat} destLng={destinationLng} directionMode={directionMode}/>
        </>
    );
};

export default HouseDetails;