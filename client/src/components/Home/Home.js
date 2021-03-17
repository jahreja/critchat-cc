import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import logo from "./navlogo.png";


const Home = () => {
    return(
        <div className="Home">
            <Link to="./join">
                <img className="main-logo" alt="" src={logo} />
            </Link>
        </div>
    )
}

export default Home;