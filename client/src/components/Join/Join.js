import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Join = () => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return(
        <div className="main">
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join a Room</h1>
                    <div><input type="text" placeholder="Name" className="joinInput" onChange={(event) => setName(event.target.value)} /></div>
                    <div><input type="text" placeholder="Room ID" className="joinInput mt-20" onChange={(event) => setRoom(event.target.value)} /></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit"><FontAwesomeIcon icon={faCoffee} /></button>
                    </Link>
                </div>
            </div>
        </div>    
    )
}

export default Join;