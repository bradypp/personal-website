import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const Date = ({ date }) => {
    return <time dateTime={date}>{format(date, 'dd LLLL yyyy')}</time>;
};

Date.propTypes = {
    date: PropTypes.string.isRequired,
};

export default Date;
