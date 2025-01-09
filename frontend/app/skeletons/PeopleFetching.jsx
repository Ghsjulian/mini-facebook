import React from "react";
import { NavLink } from "react-router-dom";

const PeopleFetching = () => {
    const dummyArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

return (<>{
    dummyArr.map((element, index) => {
        return (
            <div key={index+123} className="fetching-people">
                <NavLink>
                    <div className="img"></div>
                    <div className="flex-column">
                        <span></span>
                        <span></span>
                    </div>
                </NavLink>
                <button></button>
            </div>
        );
    })
}
    </>)
};

export default PeopleFetching;
