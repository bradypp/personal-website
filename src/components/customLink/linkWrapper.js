import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const LinkWrapper = forwardRef(({ children, to, className }, ref) => (
    <Link className={className} to={to} ref={ref}>
        {children}
    </Link>
));

LinkWrapper.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
};
LinkWrapper.defaultProps = {
    className: undefined,
    children: undefined,
};

export default LinkWrapper;
