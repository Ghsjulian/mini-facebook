import React, { useRef, useState, useEffect } from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
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
import { getUser, api } from "../auth/isLogin";

const ChatBox = () => {
    const { isLogin, messages, setMessages } = useAuth();
    const { user_id, user_name } = useParams();

    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [fileData, setfileData] = useState(null);

    const [loading, setLoading] = useState(false);
    const typeRef = useRef(null);
    const message_box = useRef(null);

    const handleFile = event => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = result => {
                setfileData(reader.result);
            };
            reader.readAsDataURL(selectedFile); // Read the file as a data URL
        }
    };
    const crossImg = () => {
        setfileData(null);
        setFile(null);
    };
    const AppendChat = message => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const user = document.createElement("img");
        const span = document.createElement("span");
        div.className = "chat right";
        user.src = getUser().avatar;
        p.textContent = message;
        span.textContent = "10:45PM";

        div.appendChild(user);
        div.appendChild(p);
        div.appendChild(span);
        message_box.current.appendChild(div);
    };
    const SendMessage = async () => {
        try {
            const request = await fetch(
                `${api}/message/send-message/${user_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        minifacebook: getUser().token || null
                    },
                    body: JSON.stringify({ message: message })
                }
            );
            const response = await request.json();
            AppendChat(message);
            typeRef.current.focus();
            message_box.current.scrollTop = message_box.current.scrollHeight;
            setMessage("");
            /*--> Socket Emit Will Be Here <--*/

            /*--> Socket Emit Will Be Here <--*/
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getConversations = async id => {
            setLoading(true);
            try {
                const request = await fetch(
                    `${api}/message/get-message/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            minifacebook: getUser().token || null
                        }
                    }
                );
                const data = await request.json();
                setMessages(data);
            } catch (error) {
                console.log(
                    "Error While Fetching Conversation In Client Side --> ",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        getConversations(user_id);
        document.title = "Chatting With - " + user_name;
        if (loading) return;
    }, [user_id, user_name]);

    return (
        <>
            {isLogin ? (
                <div class="app">
                    <Header />
                    <main ref={message_box} className="chat--box">
                        {/*--> Chat Will Be Display <--*/}
                        {!loading && messages.length > 0 && (
                            <Chats chats={messages} />
                        )}
                        {/*--> Chat Will Be Display <--*/}
                    </main>
                    {/*--> Footer Typing <--*/}
                    <footer>
                        {fileData && (
                            <>
                                <img className="selected-img" src={fileData} />
                                <img
                                    onClick={crossImg}
                                    className="close"
                                    src="/icons/close-x.png"
                                />
                            </>
                        )}
                        <div className="box">
                            <button className="add-file">
                                <label htmlFor="file">
                                    <img src="/icons/plus.png" />
                                </label>
                            </button>
                            <input
                                id="file"
                                type="file"
                                onChange={handleFile}
                                accept="*/*"
                                hidden
                            />
                            <input
                                ref={typeRef}
                                onFocus={e => {
                                    message_box.current.scrollTop =
                                        message_box.current.scrollHeight;
                                }}
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
