import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CustomLink } from '@components';

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    min-height: 100vh;
`;
const Title = styled.h2`
    margin-left: 0.3rem;
    font-size: var(--font-size-h3);
    font-weight: 400;
`;
const Subtitle = styled.h3`
    text-align: center;
    font-size: 12rem;
    line-height: 1.1;
    position: relative;
    transition: var(--transition);
    perspective: 500rem;
    padding: 0 0.3rem;

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1.8rem;
        position: absolute;
        bottom: 0.33em;
        left: 0;
        z-index: -1;
        background: linear-gradient(45deg, var(--color-primary-light), var(--color-primary));
        transition: var(--transition);
    }

    &:hover {
        color: var(--color-text-secondary-1);
        &:after {
            bottom: 0.16em;
            height: 12rem;
        }
    }
`;
const Description = styled.div`
    width: 50%;
    max-width: 50rem;
    margin-bottom: 5rem;
`;

const Hero = ({ data }) => {
    const { frontmatter, html } = data[0].node;
    return (
        <Section>
            <Title>{frontmatter.title}</Title>
            <Subtitle>{frontmatter.subtitle}</Subtitle>
            <Description dangerouslySetInnerHTML={{ __html: html }} />
            <CustomLink variant="primary-button" to="/">
                {frontmatter.contact}
            </CustomLink>
            {/* <CustomLink variant="primary-button" to="/">
                {frontmatter.projects}
            </CustomLink> */}
        </Section>
    );
};

Hero.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Hero;
