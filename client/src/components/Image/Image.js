import React from "react";
import { useState, useEffect, useRef } from "react";

import "./Image.css";



import io from "socket.io-client";


let socket;

const Image = ({ sendPreview }) => {

    const ENDPOINT = "localhost:5000";

    socket = io(ENDPOINT)

    

    

    

    return (
        <div className="uploadImageBox">
            
        </div>
    )

}

export default Image;

