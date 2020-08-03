import { useEffect } from 'react';
import { navigate } from 'gatsby';

// TODO
const NotFoundPage = () => {
    useEffect(() => {
        navigate('/');
    }, []);

    return null;
};

export default NotFoundPage;
