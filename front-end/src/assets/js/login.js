// Create login Script Here
// Select The Dom Elements
const loginBtn = document.querySelector("#login-btn");
const loader = document.querySelector(".loader");
const head = document.querySelector("#head");
const messageElement = document.querySelector("#message");
const loginContainer = document.querySelector(".login");

// Create For Printing Messages On The Form
const showMessage = (message, type) => {
    if (type) {
        messageElement.classList.add("success");
        messageElement.textContent = message;
    } else {
        loginContainer.classList.add("error-animation");
        head.style.color = "red";
        loginBtn.style.backgroundColor = "red";
        loginContainer.style.border = "1.5px solid red";
        messageElement.classList.add("error");
        messageElement.textContent = message;
    }
    setTimeout(() => {
        //if(document.querySelector("input"))
        document.querySelector("#email").style.border = "1.5px solid #0081c4";
        document.querySelector("#password").style.border =
            "1.5px solid #0081c4";
        head.style.color = "#0081c4";
        loginBtn.style.backgroundColor = "#0081c4";
        loginContainer.classList.remove("error-animation");
        loginContainer.style.border = "1.5px solid #878787";
        messageElement.textContent = "";
        messageElement.setAttribute("class", "");
    }, 3500);
};
// Send Login Details To The Server
const LoginNow = async (email, password) => {
    const api = "http://localhost:3000/api/login";
    const user = {
        email,
        password
    };
    document.querySelector("#txt").textContent = "Processing...";
    loader.classList.add("load");
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const response = await request.json();
        console.log(response);
        if (response.success) {
            document.querySelector("#txt").textContent = "Login Success";
            showMessage(response.message, true);
            loader.classList.remove("load");
        } else {
            document.querySelector("#txt").textContent = "Login Now";
            showMessage(response.message, false);
            document.querySelector("#" + response.loc).style.border =
                "1.5px solid red";
            document.querySelector("#" + response.loc).focus();
            loader.classList.remove("load");
        }
    } catch (error) {
        console.log(error);
        showMessage(error.message, false);
        document.querySelector("#txt").textContent = "Login Now";
        loader.classList.remove("load");
    }
};
// Create Login Event
loginBtn.onclick = () => {
    var email = document.querySelector("#email").value.trim();
    var password = document.querySelector("#password").value.trim();
    
    // Create Validation And Conditions
    if (email === "" && password === "") {
        showMessage("Please Enter Your Details", false);
        document.querySelector("#email").style.border = "1.5px solid red";
        document.querySelector("#password").style.border = "1.5px solid red";
        document.querySelector("#email").focus();
        return;
    } else if (email === "") {
        document.querySelector("#email").style.border = "1.5px solid red";
        document.querySelector("#email").focus();
        showMessage("Please Enter Your Email", false);
        return;
    } else if (password === "") {
        document.querySelector("#password").style.border = "1.5px solid red";
        document.querySelector("#password").focus();
        showMessage("Please Enter Password", false);
        return;
    } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        document.querySelector("#email").style.border = "1.5px solid red";
        document.querySelector("#email").focus();
        showMessage("Invalid Email Address", false);
    } else if (password.length < 5) {
        document.querySelector("#password").style.border = "1.5px solid red";
        document.querySelector("#password").focus();
        showMessage("Password Will Be 6<", false);
    } else {
            LoginNow(email, password);
    }
};
