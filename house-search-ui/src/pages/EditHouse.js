import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

const EditHouse = ( {match} ) => {
    const id = match.params.id;
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [suburb, setSuburb] = useState('');
    const [state, setState] = useState('');
    const [postcode, setPostcode] = useState('');
    const [landSize, setLandSize] = useState(0);
    const [rent, setRent] = useState(0);
    const [price, setPrice] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
   
    const [stationName, setStationName] = useState('');
    const [stationLatitude, setStationLatitude] = useState(0);
    const [stationLongitude, setStationLongitude] = useState(0);

    const [schoolName, setSchoolName] = useState('');
    const [schoolLatitude, setSchoolLatitude] = useState(0);
    const [schoolLongitude, setSchoolLongitude] = useState(0);
    const [schoolLine1, setSchoolLine1] = useState('');
    const [schoolLine2, setSchoolLine2] = useState('');
    const [schoolSuburb, setSchoolSuburb] = useState('');
    const [schoolState, setSchoolState] = useState('');
    const [schoolPostcode, setSchoolPostcode] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/house/${id}`);
            const body = await result.json();
            setHouse(body);            
        }
        fetchData();
    }, [id]);

    const setHouse = (houseInfo) => {
        setLine1(houseInfo.address.line1);
        setLine2(houseInfo.address.line2);
        setSuburb(houseInfo.address.suburb);
        setPostcode(houseInfo.address.postcode);
        setState(houseInfo.address.state);
        setLandSize(houseInfo.landSize);
        setRent(houseInfo.rent);
        setPrice(houseInfo.price);
        setLatitude(houseInfo.latitude);
        setLongitude(houseInfo.longitude);  
        
        if (houseInfo.stations) {
            setStationName(houseInfo.stations[0].name);
            setStationLatitude(houseInfo.stations[0].latitude);
            setStationLongitude(houseInfo.stations[0].longitude);
        }
        
        if (houseInfo.schools) {
            setSchoolName(houseInfo.schools[0].name);
            setSchoolLatitude(houseInfo.schools[0].latitude);
            setSchoolLongitude(houseInfo.schools[0].longitude);
            setSchoolLine1(houseInfo.schools[0].address.line1);
            setSchoolLine2(houseInfo.schools[0].address.line2);
            setSchoolSuburb(houseInfo.schools[0].address.suburb);
            setSchoolPostcode(houseInfo.schools[0].address.postcode);
            setSchoolState(houseInfo.schools[0].address.state);
        }
    }

    const editHouse = async () => {
        //setRedirect(true);
        //setError("test error");

        if (state === "-1" || schoolState === "-1"){
            alert("Select a state.");
            return;
        }

        const result = await fetch(`/api/house/${id}`, {
            method: 'put',
            body: JSON.stringify({
                id,
                rent,
                price,
                landSize,
                address: {
                    line1,
                    line2,
                    suburb,
                    postcode,
                    state
                },
                latitude,
                longitude,
                stations: [{
                    name: stationName,
                    latitude: stationLatitude,
                    longitude: stationLongitude
                }],
                schools: [{
                    name: schoolName,
                    latitude: schoolLatitude,
                    longitude: schoolLongitude,
                    address: {
                        line1: schoolLine1,
                        line2: schoolLine2,
                        suburb: schoolSuburb,
                        postcode: schoolPostcode,
                        state: schoolState
                    },
                }]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setRedirect(true);
    }

    if (redirect === true) {
        return <Redirect to="/" />
    }

    return (
        <>
            <h1>Edit House {id}</h1>
            <Link to="/">
                <span>Houses</span>
            </Link>
            <span>/Edit House</span>

            <div>
            <p className="text-danger">{error}</p>
            </div>
            
            <div id="add-house-form">
                <label>
                    Address Line 1: 
                    <input type="text" value={line1} 
                        onChange={(event) => setLine1(event.target.value)} />
                </label>
                <label>
                    Address Line 2: 
                    <input type="text" value={line2} 
                        onChange={(event) => setLine2(event.target.value)} />
                </label>
                <label>
                    Suburb: 
                    <input type="text" value={suburb} 
                        onChange={(event) => setSuburb(event.target.value)} />
                </label>
                <label>
                    State: 
                    <select value={state} onChange={(event) => setState(event.target.value)}>
                        <option value="-1">Select a state</option>
                        <option value="NSW">New South Wales</option>
                        <option value="QLD">Queensland</option>
                        <option value="VIC">Victoria</option>
                        <option value="ADL">Adelaide</option>
                        <option value="TAS">Tasmania</option>
                        <option value="ACT">Canberra</option>
                        <option value="WA">Western Australia</option>
                        <option value="NT">Northern Territory</option>
                    </select>
                </label>
                <label>
                    Postcode: 
                    <input type="text" value={postcode} 
                        onChange={(event) => setPostcode(event.target.value)} />
                </label>
                <label>
                    Land Size: 
                    <input type="text" value={landSize} 
                        onChange={(event) => setLandSize(event.target.value)} />
                </label>
                <label>
                    Rent: 
                    <input type="text" value={rent} 
                        onChange={(event) => setRent(event.target.value)} />
                </label>
                <label>
                    Price: 
                    <input type="text" value={price} 
                        onChange={(event) => setPrice(event.target.value)} />
                </label>               

                <label>
                    Station Name: 
                    <input type="text" value={stationName} 
                        onChange={(event) => setStationName(event.target.value)} />
                </label>

                <label>
                    School Name: 
                    <input type="text" value={schoolName} 
                        onChange={(event) => setSchoolName(event.target.value)} />
                </label>

                <label>
                    Address Line 1: 
                    <input type="text" value={schoolLine1} 
                        onChange={(event) => setSchoolLine1(event.target.value)} />
                </label>
                <label>
                    Address Line 2: 
                    <input type="text" value={schoolLine2} 
                        onChange={(event) => setSchoolLine2(event.target.value)} />
                </label>
                <label>
                    Suburb: 
                    <input type="text" value={schoolSuburb} 
                        onChange={(event) => setSchoolSuburb(event.target.value)} />
                </label>
                <label>
                    State: 
                    <select value={schoolState} onChange={(event) => setSchoolState(event.target.value)}>
                        <option value="-1">Select a state</option>
                        <option value="NSW">New South Wales</option>
                        <option value="QLD">Queensland</option>
                        <option value="VIC">Victoria</option>
                        <option value="ADL">Adelaide</option>
                        <option value="TAS">Tasmania</option>
                        <option value="ACT">Canberra</option>
                        <option value="WA">Western Australia</option>
                        <option value="NT">Northern Territory</option>
                    </select>
                </label>
                <label>
                    Postcode: 
                    <input type="text" value={schoolPostcode} 
                        onChange={(event) => setSchoolPostcode(event.target.value)} />
                </label>

                <button className="btn btn-primary" onClick={() => editHouse()}>Save</button>
                <Link to="/" className="action-link">
                    <span>Cancel</span>
                </Link>
            </div>
        </>
    );
}

export default EditHouse;