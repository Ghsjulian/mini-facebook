import React from "react";
import { NavLink } from "react-router-dom";

const PostFetching = () => {
    const fetchArr = [1,2,3,4,5,6,7,8,9,10]
    return (
       <>
       {
           fetchArr.map((element, index) =>{
               return (
                   
                    <div key={index+502} className="post-fetching">
            <NavLink to="/">
                <div className="img" />
                <span></span>
            </NavLink>
            <div className="content">
                <div className="date" />
                <p></p>
                <div className="img" />
            </div>
            <div className="action-area">
                <button className="love">
                </button>
                <button className="comment">
                </button>
                <button className="share">
                </button>
            </div>
        </div>
                   )
           })
       }
       </>
    );
};

export default PostFetching;
