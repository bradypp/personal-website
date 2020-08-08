import React from 'react';
import PropTypes from 'prop-types';

const Date = ({ date }) => <time dateTime={date}>{date}</time>;

Date.propTypes = {
    date: PropTypes.string.isRequired,
};

export default Date;
