import React from "react";
import { NavLink } from "react-router-dom";
import NewsFeedPost from "../components/NewsFeedPost"


const Home = () => {
    return (
        <>
            <div className="post">
                <h3>Create New Post</h3>
                <textarea placeholder="Write A Post..."></textarea>
                <button className="post-btn">Post Now</button>
            </div>

            {/* <!-- Post List -->*/}
             <NewsFeedPost/>
        </>
    );
};

export default Home;
