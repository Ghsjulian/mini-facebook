import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/index.css";
import useCookie from "../hooks/useCookie";
// import { setCookie } from "../auth/Cookies";
//import { useAuth } from "../auth/Auth";
// import { useSocket } from "../auth/SocketProvider";
//import { useSocket } from "../socket/SocketProvider";

const Login = () => {
    const { setCookie } = useCookie();
    const api = "http://localhost:3000/api/user/login";
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Other Form And Elements
    const loader = useRef(null);
    const messageElement = useRef(null);
    const loginBtn = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginContainer = useRef(null);
    const txtRef = useRef(null);
    // Create For Printing Messages On The Form
    const showMessage = (message, type) => {
        if (type) {
            messageElement.current.classList.add("success");
            messageElement.current.textContent = message;
        } else {
            loginContainer.current.classList.add("error-animation");
            loginBtn.current.style.backgroundColor = "red";
            loginContainer.current.style.border = "1.5px solid red";
            messageElement.current.classList.add("error");
            messageElement.current.textContent = message;
        }
        setTimeout(() => {
            //if(document.querySelector("input"))
            emailRef.current.style.border = "1.5px solid #0081c4";
            passwordRef.current.style.border = "1.5px solid #0081c4";
            loginBtn.current.style.backgroundColor = "#0081c4";
            loginContainer.current.classList.remove("error-animation");
            loginContainer.current.style.border = "1.5px solid #878787";
            messageElement.current.textContent = "";
            messageElement.current.setAttribute("class", "");
        }, 3500);
    };
    // Send Login Credintials To The Server
    const SendToServer = async (email, password) => {
        // const api = import.meta.env.VITE_API_URL;
        const user = {
            email,
            password
        };
        txtRef.current.textContent = "Processing...";
        loader.current.classList.add("load");
        try {
            const request = await fetch(api, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
            const response = await request.json();
            if (response.success) {
                setCookie("minifacebook", JSON.stringify(response.user));
                txtRef.current.textContent = "Login Success";
                showMessage(response.message, true);
                loader.current.classList.remove("load");
                navigate("/");
            } else {
                txtRef.current.textContent = "Login Now";
                showMessage(response.message, false);
                emailRef.current.style.border = "1.5px solid red";
                passwordRef.current.style.border = "1.5px solid red";
                loader.current.classList.remove("load");
            }
        } catch (error) {
            console.log("Error in Client Side Login --> ", error.message);
            setLoading(false);
            showMessage(error.message, false);
            txtRef.current.textContent = "Login Now";
            loader.current.classList.remove("load");
        } finally {
            setLoading(false);
        }
    };
    const LoginNow = e => {
        e.preventDefault();
        // Create Validation And Conditions
        if (email.trim() === "" && password.trim() === "") {
            showMessage("Please Enter Your Details", false);
            emailRef.current.style.border = "1.5px solid red";
            emailRef.current.focus();
            return;
        } else if (email.trim() === "") {
            emailRef.current.style.border = "1.5px solid red";
            emailRef.current.focus();
            showMessage("Please Enter Your Email", false);
            return;
        } else if (password.trim() === "") {
            passwordRef.current.style.border = "1.5px solid red";
            passwordRef.current.focus();
            showMessage("Please Enter Password", false);
            return;
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            emailRef.current.style.border = "1.5px solid red";
            emailRef.current.focus();
            showMessage("Invalid Email Address", false);
        } else if (password.trim().length < 5) {
            passwordRef.current.style.border = "1.5px solid red";
            passwordRef.current.focus();
            showMessage("Password Will Be 6<", false);
        } else {
            SendToServer(email.trim(), password.trim());
        }
    };

    return (
        <div className="full-container">
            <div ref={loginContainer} className="login">
                {/*<h2 ref={head} id="head">
                    Please Login Now
                </h2>*/}
                <img src="/favicons/mini-facebook.png" />
                <span ref={messageElement} id="message"></span>
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter Email Address"
                    id="email"
                    name="email"
                    required
                    onChange={e => {
                        setemail(e.target.value);
                    }}
                    value={email}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    name="password"
                    required
                    onChange={e => {
                        setpassword(e.target.value);
                    }}
                    value={password}
                />

                <button ref={loginBtn} onClick={LoginNow} id="login-btn">
                    <div ref={loader} className="loader"></div>
                    <span ref={txtRef} id="txt">
                        Login Now
                    </span>
                </button>
                <p>
                    Dont Have An Account ?
                    <NavLink to="/signup">Signup Now</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
