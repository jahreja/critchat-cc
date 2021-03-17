import React from "react";

import "./InfoBar.css";

// import logo from "./navlogo.png";
import closeIcon from "./closeIcon.png";
import onlineIcon from "./onlineIcon.png";

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>Crit Space {room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                <img src={closeIcon} alt="close icon" />
            </a>
        </div>
    </div>
)

export default InfoBar;