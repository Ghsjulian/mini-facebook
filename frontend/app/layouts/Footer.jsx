import React, { useState, useEffect, useRef } from "react";
import { useValid } from "../hooks/useValid";

const Footer = ({ message_box }) => {
    const [message, setMessage] = useState("");
    const typeRef = useRef(null);
    const SendMessage = async () => {
        message_box.current.innerHTML = `
            <div className="message right">
                <p>
                    ${message}
                </p>
            </div>
        `;
        typeRef.current.focus();
    };

    return (
        <footer>
            <div className="box">
                <button className="add-file">
                    <img src="/icons/plus.png" />
                </button>
                <input
                    ref={typeRef}
                    onChange={e => {
                        setMessage(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            SendMessage();
                        }
                    }}
                    value={message}
                    type="text"
                    id="message"
                    placeholder="Type A Message..."
                />
                <button onClick={SendMessage} className="send">
                    <img src="/icons/send.png" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
