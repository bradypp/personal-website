import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins } from '@styles';

const StyledOutboundLink = styled.a`
    ${props => props.variant === 'inline' && mixins.inlineLink}
`;

const OutboundLink = ({ children, className, href, variant, ...props }) => {
    const link = href && href.startsWith('http') ? href : `//${href}`;
    return (
        <StyledOutboundLink className={className} href={link} {...props}>
            {children}
        </StyledOutboundLink>
    );
};

OutboundLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    variant: PropTypes.oneOf(['inline']),
};

OutboundLink.defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    variant: 'inline',
};

export default OutboundLink;
