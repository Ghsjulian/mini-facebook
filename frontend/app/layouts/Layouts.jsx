import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Imported The Bootsrtrap Icons
import "../styles/vendor/bootstrap/css/bootstrap.min.css";
import "../styles/vendor/bootstrap-icons/bootstrap-icons.css";
import "../styles/vendor/boxicons/css/boxicons.min.css";
import "../styles/vendor/remixicon/remixicon.css";
// Imported The CSS Styles Files
import "../styles/chat-ui.css";
import "../styles/home.css";
import "../styles/fetching.css";

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
