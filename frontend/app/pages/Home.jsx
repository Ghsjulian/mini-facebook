import React from "react";
import { NavLink } from "react-router-dom";
import NewsFeedPost from "../components/NewsFeedPost";
import CreatePost from "../components/CreatePost";

const Home = () => {
    return (
        <>
            <CreatePost />
            {/* <!-- Post List -->*/}
            <NewsFeedPost />
        </>
    );
};

export default Home;
