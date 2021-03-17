import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";


// import image from "./IMG_3276.JPG";
import logo from "./navlogo.png";
import "./Chat.css";


import InfoBar from "../InfoBar/InfoBar.js"
import Input from "../Input/Input.js"
import Messages from "../Messages/Messages.js"
// import Image from "../Image/Image.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';




let socket;



const Chat = ({ location }) => {

    

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    // const [users, setUsers] = useState("")
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "http://localhost:5000/";
    const fileInputRef = useRef();
    const [image, setImage] = useState();
    const [preview, setPreview] = useState("")

    // const imgRef = React.createRef();

    

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, () => {
        });

        return () => {
            socket.emit("disconnect");

            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })

        socket.on("image", (image) => {
            setPreview(image)
        })

        return () => {
            socket.off()
        }
    }, [messages]);




    // Function for sending messages
    const sendMessage = (event) => {

        event.preventDefault();

        if(message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    }

    // const sendImage = (event) => {

    //     if(preview){
    //         socket.emit("sendImage", preview);
    //     }

    // }


    ///////////////////////////////////////////////////////////////////////
    const onButtonClick = () => {
            fileInputRef.current.click();
            console.log("click input")
    }

    const inputChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && file.type.substr(0,5) === "image"){
             setImage(file);
             console.log("image set")
        } else {
              setImage(null); 
        }
    }
    

    useEffect(() => {

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                // const base64 = reader.result.replace(/.*base64,/,'');
                // setPreview(base64);
                console.log("uploaded");
                const sendImage = (event) => {
                    if(preview){
                        socket.emit("sendImage", preview);
                    }
                }
                sendImage(preview)
            }
            reader.readAsDataURL(image);

        } else {
            setPreview(null)
        }

        // return () => {
        //     socket.off()
        // }

    }, [image, preview])


    


    ///////////////////////////////
    
    return(
        <div className="mainPage">

            <a href="/">
                <img alt="" src={logo} className="headerlogo" />
            </a>

            <div className="outerContainer">

                    <div className="container">
                        <InfoBar room={room} /> 
                        <Messages messages={messages} name={name} />
                        {/* <TextContainer users={users} /> */}
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>

                    <div className="imageContainer">
                        <div className="imageBox">
                            <form className="imageForm">
                                {preview ? (<img  className="image" alt="" src={preview} />) :
                                (<button type="button" onClick={onButtonClick} className="upload"><FontAwesomeIcon icon={faUpload} /></button>)}
                                <input type="file" style={{display:"none"}} ref={fileInputRef} accept="image/*" onChange={inputChange} />
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    )

}

export default Chat;

