import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const AddHouse = () => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [suburb, setSuburb] = useState('');
    const [state, setState] = useState('');
    const [postcode, setPostcode] = useState('');
    const [landSize, setLandSize] = useState(0);
    const [rent, setRent] = useState(0);
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    
    const [stationName, setStationName] = useState('');

    const [schoolName, setSchoolName] = useState('');
    const [schoolLine1, setSchoolLine1] = useState('');
    const [schoolLine2, setSchoolLine2] = useState('');
    const [schoolSuburb, setSchoolSuburb] = useState('');
    const [schoolState, setSchoolState] = useState('');
    const [schoolPostcode, setSchoolPostcode] = useState('');

    const addHouse = async () => {
        //setRedirect(true);
        //setError("test error");

        if (state === "-1" || schoolState === "-1"){
            alert("Select a state.");
            return;
        }

        const result = await fetch(`/api/house`, {
            method: 'post',
            body: JSON.stringify({
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
                stations: [{
                    name: stationName
                }],
                schools: [{
                    name: schoolName,
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

        const body = await result.json();
        console.log(body);
        // if (body.status === '200'){
        //     setRedirect(true);
        // }
        // else {
        //     setError("An error occurred!");            
        // }
        setRedirect(true);
    }

    if (redirect === true) {
        return <Redirect to="/" />
    }

    return (
        <>
            <h1>Add House</h1>
            <Link to="/">
                <span>Houses</span>
            </Link>
            <span>/Add House</span>

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

                <button className="btn btn-primary" onClick={() => addHouse()}>Save</button>
                <Link to="/" className="action-link">
                    <span>Cancel</span>
                </Link>
            </div>
        </>
    );
}

export default AddHouse;