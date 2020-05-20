import React from 'react';
import PropTypes from 'prop-types';

const OutboundLink = ({ className, children, href, target, style, rel }) => {
    const link = href && href.startsWith('http') ? href : `//${href}`;
    return (
        <a className={className} href={link} target={target} rel={rel} style={style}>
            {children}
        </a>
    );
};

OutboundLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    style: PropTypes.object,
};

OutboundLink.defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: undefined,
};

export default OutboundLink;
