import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins } from '@styles';

const StyledOutboundLink = styled.a`
    ${mixins.inlineLink}
`;

const OutboundLink = ({ children, href, ...props }) => {
    const link = href && href.startsWith('http') ? href : `//${href}`;
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
    style: PropTypes.object,
};

OutboundLink.defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: undefined,
};

export default OutboundLink;
