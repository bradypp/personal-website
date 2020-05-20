import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { buttonStyles } from '@styles';

const LinkWrapper = ({ children, to, className }) => (
    <Link className={className} to={to}>
        {children}
    </Link>
);

const StyledLinkWrapper = styled(LinkWrapper)`
    ${buttonStyles}
`;

const CustomLink = ({ children, ...props }) => (
    <StyledLinkWrapper {...props}>{children}</StyledLinkWrapper>
);

CustomLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['inline-link', 'primary-button']),
};

CustomLink.defaultProps = {
    to: undefined,
    className: undefined,
    children: undefined,
    variant: 'inline-link',
};

export default CustomLink;
