import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { mixins, buttonStyles } from '@styles';

const linkStyles = css`
    svg {
        color: currentColor;
        fill: currentColor;
    }
    ${props => {
        switch (props.variant) {
            case 'primary':
                return mixins.primaryLink;
            case 'secondary':
                return mixins.secondaryLink;
            case 'button-primary':
                return buttonStyles.primary;
            default:
                return null;
        }
    }}
`;

const StyledLink = styled(Link)`
    ${linkStyles}
`;

const StyledOutboundLink = styled(OutboundLink)`
    ${linkStyles}
`;

const CustomLink = ({ children, href, to, rel, target, ...props }) => {
    if (to && href && process.env.NODE_ENV !== 'production') {
        throw new Error('Link component has both a `to` and `href` prop');
    }

    if (to) {
        return (
            <StyledLink to={to} {...props}>
                {children}
            </StyledLink>
        );
    }

    const link =
        href && (href.startsWith('mailto') || href.startsWith('http')) ? href : `//${href}`;
    return (
        <StyledOutboundLink href={link} rel={rel} target={target} {...props}>
            {children}
        </StyledOutboundLink>
    );
};

CustomLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'button-primary']),
    to: PropTypes.string,
};

CustomLink.defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    variant: 'primary',
    href: undefined,
    to: undefined,
};

export default CustomLink;
