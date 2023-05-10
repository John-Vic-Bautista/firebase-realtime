import React, { useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Items");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("Items");
        }   else if (location.pathname === "/add") {
            setActiveTab("AddItem");
        }   else if (location.pathname === "/about") {
            setActiveTab("About");
        }
    }, [location]);
    return ( 
        <div className="header">
            <p className="logo">Training Plan</p>
            <div className="header-right">
                <Link to="/">
                    <p
                    className={`${activeTab === "Exercise"}? "active" : ""`}
                    onClick={() => setActiveTab("Exercise")}
                    >
                        Exercises
                    </p>
                </Link>
                <Link to="/add">
                    <p
                    className={`${activeTab === "AddPlan"}? "active" : ""`}
                    onClick={() => setActiveTab("AddPlan")}
                    >
                        Add Plan
                    </p>
                </Link>
                <Link to="/about">
                    <p
                    className={`${activeTab === "About Me"}? "active" : ""`}
                    onClick={() => setActiveTab("About Me")}
                    >
                        About Me
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Header;