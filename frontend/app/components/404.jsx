import React from "react";
import { NavLink } from "react-router-dom";
const NotFound = () => {
    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff"
            }}
        >
            <img
                style={{
                    width: "100%",
                    height: "80%",
                    margin: "1rem auto",
                    objectFit: "contain"
                }}
                src="/images/team.jpg"
            />
            <h2
                style={{
                    position: "absolute",
                    bottom: "20rem",
                    color: "red",
                    fontWeight: "800",
                    margin: "auto"
                }}
            >
                Error : Route Not Found - 404
            </h2>
            <NavLink
                style={{
                    fontSize: "25px",
                    color: "#009dd9",
                    fontWeight: "800",
                    margin: ".3rem auto",
                    marginBottom: "17rem",
                    textDecoration: "none"
                }}
                to="/"
            >
                Go To Homepage
            </NavLink>
        </div>
    );
};

export default NotFound;
