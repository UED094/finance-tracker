import React from 'react';
import Balance from "../components/Balance";

const Home = (props) => {



    return (
        <>
          <Balance amount={100} transaction={props.transactions}/>
        </>
    );
};

export default Home;