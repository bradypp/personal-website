import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

const TransitionStyles = css`
    .fadeup-enter {
        opacity: 0.01;
        transform: translateY(2rem);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadeup-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadeleft-enter {
        opacity: 0.01;
        transform: translateX(5rem);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadeleft-enter-active {
        opacity: 1;
        transform: translateX(0rem);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadedown-enter {
        opacity: 0.01;
        transform: translateY(-2rem);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadedown-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fade-enter {
        opacity: 0.01;
        transition: opacity 1000ms var(--ease);
    }

    .fade-enter-active {
        opacity: 1;
        transition: opacity 1000ms var(--ease);
    }

    .fade-exit {
        opacity: 1;
        transition: opacity 1000ms var(--ease);
    }

    .fade-exit-active {
        opacity: 0;
        transition: opacity 1000ms var(--ease);
    }
`;

export default TransitionStyles;
