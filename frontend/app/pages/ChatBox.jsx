import React, { useRef, useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Chats from "../components/Chats";
// Imported The Bootsrtrap Icons
import "../styles/vendor/bootstrap/css/bootstrap.min.css";
import "../styles/vendor/bootstrap-icons/bootstrap-icons.css";
import "../styles/vendor/boxicons/css/boxicons.min.css";
import "../styles/vendor/remixicon/remixicon.css";
// Imported The CSS Styles Files
import "../styles/chat-ui.css";
import "../styles/home.css";
import "../styles/fetching.css";
// Imported Use Auth
import { useAuth } from "../contexts/useUserContext";
import { getUser } from "../auth/isLogin";

const ChatBox = () => {
    const { isLogin } = useAuth();
    const [message, setMessage] = useState("");
    const typeRef = useRef(null);
    const message_box = useRef(null);

    const AppendChat = message => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const user = document.createElement("img");
        const span = document.createElement("span");
        div.className = "message bubble right";
        user.src = getUser().avatar;
        p.textContent = message;
        span.textContent = "10:45PM";

        div.appendChild(user);
        div.appendChild(p);
        div.appendChild(span);
        message_box.current.appendChild(div);
    };
    const SendMessage = async () => {
        AppendChat(message);
        typeRef.current.focus();
        setMessage("")
    };

    return (
        <>
            {isLogin ? (
                <div class="app">
                    <Header />
                    <main ref={message_box}>
                        {/*--> Chat Will Be Display <--*/}
                        <div className="message bubble right">
                            <img src="/icons/girl.png" />
                            <p>This is message</p>
                            <span>12:12PM</span>
                        </div>
                        <div className="message bubble left">
                            <img src="/icons/girl.png" />
                            <p>This is message</p>
                            <span>12:12PM</span>
                        </div>
                        {/*--> Chat Will Be Display <--*/}
                    </main>
                    {/*--> Footer Typing <--*/}
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
                    {/*--> Footer Typing <--*/}
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ChatBox;
