import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OutboundLink as GatsbyOutboundLink } from 'gatsby-plugin-google-analytics';

import { buttonStyles } from '@styles';

const StyledOutboundLink = styled(GatsbyOutboundLink)`
    ${buttonStyles}
`;

const OutboundLink = ({ children, href, ...props }) => {
    const link =
        href && (href.startsWith('mailto') || href.startsWith('http')) ? href : `//${href}`;
    return (
        <StyledOutboundLink href={link} {...props}>
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
    variant: PropTypes.oneOf(['inline-link', 'styled-link', 'button-primary']),
};

OutboundLink.defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    variant: 'inline-link',
};

export default OutboundLink;
