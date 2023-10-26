import React from 'react';
import TopNavbar from "./TopNavbar";
import Banner from "./Banner";


const Header = () => {

    return (
        <>
            <TopNavbar />
            <Banner title={"Expense Tracker"}/>
        </>
    );
};

export default Header;