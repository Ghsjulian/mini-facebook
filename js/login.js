const action = document.querySelector("#action");

const setCookie = async (cookieName, cookieValue) => {
    const expirationDate = new Date();
    expirationDate.setTime(
        expirationDate.getTime() + 2 * 30 * 24 * 60 * 60 * 1000
    ); // 2 months in milliseconds
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
};
const getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const getToken = () => {
    var obj = JSON.parse(getCookie("minifacebook"));
    return obj.token;
};

const SignupNow = async () => {
    const api = "http://localhost:3000/api/user/signup";
    const user = {
        name: "Sunita Sinha",
        email: "sunita@gmail.com",
        password: "123456"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const response = await request.json();
        setCookie("minifacebook", response.user.token);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const LoginNow = async () => {
    const api = "http://localhost:3000/api/user/login";
    const user = {
        email: "ghsjulian@gmail.com",
        password: "123456"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const response = await request.json();
        setCookie("minifacebook", response.user.token);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const LogoutNow = async () => {
    const api = "http://localhost:3000/api/user/logout";
    const user = {
        email: "ghsjulian@gmail.com",
        password: "123456"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            },
            body: JSON.stringify(user)
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const ReadImage = async () => {
    try {
        // Fetch the image
        const imgSrc = document.querySelector("img").src;
        const response = await fetch(imgSrc);
        if (!response.ok) throw new Error("Network response was not ok");
        // Convert the response to a Blob
        const blob = await response.blob();
        // Create a FormData object
        const formData = new FormData();
        // Append the Blob to the FormData object
        let name = "post_img"; // "avatar" for profile picture
        formData.append("coverPic", blob, "user.jpg");
        formData.append("profilePic", blob, "user2.jpg");
        return formData;
        // You can specify a filename
    } catch (error) {
        console.log(error);
        return null;
    }
};
const UpdateProfile = async () => {
    const api = "http://localhost:3000/api/user/edit-profile";
    const user = {
        isProfile: (await ReadImage) ? "YES" : "NO",
        isCover: (await ReadImage) ? "YES" : "NO"
    };
    var formData = await ReadImage();
    formData.append("data", JSON.stringify(user));
    try {
        const request = await fetch(api, {
            method: "PUT",
            headers: {
                minifacebook: getToken() || null
            },
            body: formData
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetMe = async () => {
    const api = "http://localhost:3000/api/user/get-me";
    const user = {
        email: "ghsjulian@gmail.com",
        password: "123456"
    };
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetOneUser = async () => {
    let user_id = "672eece82d190f773e156986";
    const api = "http://localhost:3000/api/user/get-user/" + user_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetAllUser = async () => {
    const api = "http://localhost:3000/api/user/get-all-user";
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const SendFriendRequest = async () => {
    let user_id = "672eece82d190f773e156986";
    const api = "http://localhost:3000/api/user/send-friend-request/" + user_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const AcceptFriendRequest = async () => {
    let user_id = "672eece82d190f773e156986";
    const api =
        "http://localhost:3000/api/user/accept-friend-request/" + user_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const UnFriend = async () => {
    let user_id = "672eece82d190f773e156986";
    const api = "http://localhost:3000/api/user/unfriend/" + user_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

/*-------------------------*/

const CreatePost = async () => {
    const api = "http://localhost:3000/api/post/create-post";
    const post = {
        post_content: "This is a simple post for testing perposes!",
        post_img: (await ReadImage) ? "YES" : "NO"
    };
    var formData = await ReadImage();
    formData.append("data", JSON.stringify(post));
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            },
            body: formData
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const EditPost = async () => {
    let post_id = "672f3ed5f6655a517de1f0a9";
    const api = "http://localhost:3000/api/post/edit-post/" + post_id;
    const post = {
        post_content:
            "This is Edited post for testing perposes! Edited By Ghs Julian",
        post_img: (await ReadImage) ? "YES" : "NO"
    };
    var formData = await ReadImage();
    formData.append("data", JSON.stringify(post));
    try {
        const request = await fetch(api, {
            method: "PUT",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            },
            body: formData
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetOnePost = async () => {
    let post_id = "672f5c011e1630b22d1581f7";
    const api = "http://localhost:3000/api/post/get-post/" + post_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetAllPost = async () => {
    const api = "http://localhost:3000/api/post/get-all-post";
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const DeletePost = async () => {
    let post_id = "672f578df8fae244e72e1633";
    const api = "http://localhost:3000/api/post/delete-post/" + post_id;
    try {
        const request = await fetch(api, {
            method: "DELETE",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const LikePost = async () => {
    let post_id = "672f5c011e1630b22d1581f7";
    const api = "http://localhost:3000/api/post/like-post/" + post_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const CommentPost = async () => {
    let post_id = "672f5c011e1630b22d1581f7";
    const api = "http://localhost:3000/api/post/comment-post/" + post_id;
    let comment = {
        comment: "Wow awesome"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            },
            body: JSON.stringify(comment)
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

/*---------------------------------------*/
const SendMessage = async () => {
    let receiver_id = "672eece82d190f773e156986";
    const api = "http://localhost:3000/api/message/send-message/" + receiver_id;
    const message = {
        message: "This is test message"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            },
            body: JSON.stringify(message)
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
const GetMessages = async () => {
    let receiver_id = "672eece82d190f773e156986";
    const api = "http://localhost:3000/api/message/get-message/" + receiver_id;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                minifacebook: getCookie("minifacebook") || null
            }
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

/*---------------------------------------*/
/*---------ACTION---------*/
action.onclick = () => {
    /*--------------------------------------*/
    /*--> 01  */
    //   SignupNow();
    /*--> 02  */
    //   LoginNow();
    /*--> 03  */
    //   LogoutNow();
    /*--> 04  */
    //   GetMe();
    /*--> 05  */
    //   GetOneUser();
    /*--> 06  */
    //   GetAllUser();
    /*--> 07  */
    //   ReadImage();
    /*--> 08  */
    UpdateProfile();
    /*--> 09  */
    //   CreatePost();
    /*--> 10  */
    //   EditPost();
    /*--> 11  */
    //   GetOnePost();
    /*--> 12  */
    //   GetAllPost();
    /*--> 13  */
    //   DeletePost();
    /*--> 14  */
    //   LikePost();
    /*--> 15  */
    //   CommentPost();
    /*--> 16 */
    // SendFriendRequest();
    //  AcceptFriendRequest();
    //  UnFriend();
    // SendMessage();
    // GetMessages();
    /*------------------------------------*/
};
