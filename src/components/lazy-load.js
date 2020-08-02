import React from 'react';

const Placeholder = () => null;

const LazyLoad = props => {
    // While the component is loading, render a fallback placeholder.
    const [Component, setComponent] = React.useState(() => Placeholder);

    // After the initial render, fetch the component and re-render#
    // Replace path with relative path
    React.useEffect(() => {
        import('path').then(component => setComponent(() => component.default));
    }, []);

    return <Component {...props} />;
};

export default LazyLoad;
