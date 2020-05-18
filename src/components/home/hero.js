import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '@styles';

const { fontSizes } = theme;

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    min-height: 100vh;
`;
const Title = styled.h2`
    margin-left: 0.3rem;
    font-size: ${fontSizes.h3};
    font-weight: 400;
`;
const Subtitle = styled.h3`
    font-size: 10rem;
    line-height: 1.1;
    margin-bottom: 2rem;
`;
const Description = styled.div`
    width: 50%;
    max-width: 50rem;
`;

const Hero = ({ data }) => {
    const { frontmatter, html } = data[0].node;
    return (
        <Section>
            <Title>{frontmatter.title}</Title>
            <Subtitle>{frontmatter.subtitle}</Subtitle>
            <Description dangerouslySetInnerHTML={{ __html: html }} />
        </Section>
    );
};

Hero.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Hero;
