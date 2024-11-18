import React, { useState, useEffect } from "react";
import { getUser } from "../auth/isLogin";

const Chats = ({ chats }) => {
    useEffect(() => {
        const container = document.querySelector(".chat--box");
        if (chats?.length > 0) {
             container.scrollTop = container.scrollHeight;
        }
    }, []);

    return (
        <>
            {chats?.length > 0 &&
                chats?.map((message, index) => {
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
        </>
    );
};

export default Chats;
