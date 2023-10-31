import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {GlobalContext} from "../context/GlobalState";

const Balance = (props) => {

    const {transactions} = useContext(GlobalContext);

    console.log(transactions)

    return (
        <section id="balanceSection">
            <Container className={"text-center bg-white text-bg-light py-4"}>
                <h4> Your Balance </h4>
                <h1> ${props.amount}</h1>
            </Container>
        </section>
    );
};

export default Balance;