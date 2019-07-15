import React from 'react';
import { Link } from 'react-router-dom';
import formatter from './Formatter';

const HouseList = ({houses}) => {
    
    return (
        <>            
            <table className="table table-hover">
                <tbody>                
                    <tr>
                        <th>Address</th>
                        <th>Suburb</th>
                        <th>State</th>
                        <th>Rent</th>
                        <th>Price</th>
                        <th>Land Size</th>
                        <th></th>
                    </tr>            
                    {houses.map( (house, key) => (
                        <tr key={key}>
                            <td>{house.address.line1} {house.address.line2}</td>
                            <td>{house.address.suburb}</td>
                            <td>{house.address.state} {house.address.postcode}</td>
                            <td>{formatter.format(house.rent)}</td>
                            <td>{formatter.format(house.price)}</td>
                            <td>{house.landSize}</td>
                            <td>
                                <Link to={`/house-details/${house.id}`} className="action-link">
                                    <span>Details</span>
                                </Link>                                
                                <Link to={`/edit-house/${house.id}`} className="action-link">
                                    <button className="btn btn-primary">
                                        Edit
                                    </button>
                                </Link>
                                <Link to={`/delete-house/${house.id}`} className="action-link">
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </Link>
                                {/* <button className="btn btn-danger" onClick={() => deleteHouse(house.id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default HouseList;