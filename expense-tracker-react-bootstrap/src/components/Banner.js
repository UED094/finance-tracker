import React from 'react';
import PropTypes from 'prop-types';

const Banner = props => {
    return (
        <>
            <h1 className="display-1 text-center m-3">{props.title}</h1>
        </>
    );
};

Banner.propTypes = {
    title: PropTypes.string
};

export default Banner;