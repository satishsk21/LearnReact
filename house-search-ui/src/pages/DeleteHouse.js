import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const DeleteHouse = ( {match} ) => {
    const id = match.params.id;
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const deleteHouse = async () => {
            const result = await fetch(`/api/house/${id}`, {
                method: 'delete'
            });
            alert("Deleted!!");
            setRedirect(true);
        }
        deleteHouse();
    }, [id]);

    if (redirect === true) {
        return <Redirect to="/" />
    }
    return (
        <>            
        </>
    )
}

export default DeleteHouse