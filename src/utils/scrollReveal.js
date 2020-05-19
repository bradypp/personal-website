import ScrollReveal from 'scrollreveal';

const isSSR = typeof window === 'undefined';
const scrollReveal = isSSR ? null : ScrollReveal();

export default scrollReveal;
