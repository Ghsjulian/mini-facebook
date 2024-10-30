import React from "react";
import {NavLink} from "react-router-dom"

const Post = () => {
    return (
        <div className="post">
            <NavLink to="/">
                <img src="images/girl.png" />
                <span>Ghs Julian </span>
            </NavLink>
            <p className="content">
                This is my post. Thi is t shirt vije gechhe knn erokom korlen
                naa kintu onek wait for the results of the day for you guys to
                come 55
            </p>
            <div className="action-area">
                <button className="love">
                    <i
                        style={{ marginTop: "5px" }}
                        className="bi bi-suit-heart"
                    ></i>
                    <span>120</span>
                </button>
                {/*<!--<button className="love">
                                <i className="bi bi-suit-heart-fill"></i>
                            </button>-->*/}
                <button className="comment">
                    <i className="bi bi-chat-text"></i>
                    <span>568</span>
                </button>
                <button className="share">
                    <i className="bi bi-share"></i>
                    <span>235</span>
                </button>
            </div>
        </div>
    );
};

export default Post;
