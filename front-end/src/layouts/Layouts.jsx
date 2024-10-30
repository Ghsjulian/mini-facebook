import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Imported The Bootsrtrap Icons
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/remixicon/remixicon.css";
// Imported The CSS Styles Files
import "../assets/css/chat-ui.css";
import "../assets/css/home.css";

const Layouts = () => {
    return (
        <div class="app">
            <Header />
            <main><Outlet/></main>
            {/* <Footer />*/}
        </div>
    );
};

export default Layouts;
