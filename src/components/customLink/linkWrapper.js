import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const LinkWrapper = forwardRef(({ children, to, className, style }, ref) => (
    <Link className={className} to={to} ref={ref} style={style}>
        {children}
    </Link>
));

LinkWrapper.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
};
LinkWrapper.defaultProps = {
    className: undefined,
    children: undefined,
    style: undefined,
};

export default LinkWrapper;
