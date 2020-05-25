import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

const TransitionStyles = css`
    .fadeup-enter,
    .fadeup-100msdelay-enter,
    .fadeup-200msdelay-enter,
    .fadeup-300msdelay-enter {
        opacity: 0.01;
        transform: translateY(2rem);
        transition: opacity 300ms var(--ease), transform 300ms var(--ease);
    }

    .fadeup-enter-active,
    .fadeup-100msdelay-enter-active,
    .fadeup-200msdelay-enter-active,
    .fadeup-300msdelay-enter-active {
        opacity: 1;
        transform: translateY(0);
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

    .fadeup-100msdelay-enter,
    .fadeup-100msdelay-enter-active {
        transition-delay: 100ms;
    }
    .fadeup-200msdelay-enter,
    .fadeup-200msdelay-enter-active {
        transition-delay: 200ms;
    }
    .fadeup-300msdelay-enter,
    .fadeup-300msdelay-enter-active {
        transition-delay: 300ms;
    }
`;

export default TransitionStyles;
