import React from 'react'
import {NavLink} from "react-router-dom"


const NewsFeedPost = () => {
  return (
    <div className="post">
                <NavLink to="/">
                    <img src="icons/girl.png" />
                    <span>Ghs Julian </span>
                </NavLink>
                <p className="content">
                    This is my post. Thi is t shirt vije gechhe knn erokom
                    korlen naa kintu onek wait for the results of the day for
                    you guys to come 55
                </p>
                <div className="action-area">
                    <button className="love">
                        {/*<i
                            style={{marginTop:"5px"}}
                            className="bi bi-suit-heart"
                        ></i>*/}
                        <img id="icon--" src="icons/blue-heart.png" />
                        <span>120</span>
                    </button>
                    {/*<!--<button className="love">
                                <i className="bi bi-suit-heart-fill"></i>
                            </button>-->*/}
                    <button className="comment">
                        {/*<i className="bi bi-chat-text"></i>*/}
                        <img id="icon--" src="icons/comment-one.png" />
                        <span>568</span>
                    </button>
                    <button className="share">
                        {/*<i className="bi bi-share"></i>*/}
                        <img id="icon--" src="icons/share-one.png" />
                        <span>235</span>
                    </button>
                </div>
            </div>
  )
}

export default NewsFeedPost