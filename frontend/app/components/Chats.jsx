import React, { useState, useEffect } from "react";
import { getUser } from "../auth/isLogin";
import { useAuth } from "../contexts/useAuth";
import { useMessage } from "../contexts/MessageContext";

const Chats = ({ chats }) => {
    const { messages, setMessages, addMessage } = useMessage(); // Use the message context
    useEffect(() => {
        const container = document.querySelector(".chat--box");
        if (messages?.length > 0) {
            container.scrollTop = container.scrollHeight;
        }
    }, []);

    return (
        <>
            {messages?.length > 0 &&
                messages?.map((message, index) => {
                    return (
                        <div
                            key={index + "123"}
                            className={
                                message?.sender_id === getUser().id
                                    ? "chat right"
                                    : "chat left"
                            }
                        >
                            {message?.sender_id === getUser().id && (
                                <img src={message?.sender_avatar} />
                            )}
                            {message?.receiver_id === getUser().id && (
                                <img src={message?.sender_avatar} />
                            )}
                            <p>{message?.message}</p>
                            <span>12:12PM</span>
                        </div>
                    );
                })}
            {/*
            <div className="chat right">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            <div className="chat left">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            <div className="chat right">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            <div className="chat left">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            <div className="chat right">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            <div className="chat left">
                <img src="/icons/girl.png" />
                <p>This is message</p>
                <span>12:12PM</span>
            </div>
            */}
        </>
    );
};

export default Chats;
