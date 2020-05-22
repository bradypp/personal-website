import React from 'react';
import PropTypes from 'prop-types';
import { MdEmail } from 'react-icons/md';
import { FaDev, FaMediumM } from 'react-icons/fa';
import { BsDiamond } from 'react-icons/bs';

import IconCV from './cv';
import IconCodepen from './codepen';
import IconExternal from './external';
import IconFolder from './folder';
import IconGitHub from './github';
import IconLinkedin from './linkedin';
import IconLocation from './location';
import IconStar from './star';
import IconTwitter from './twitter';
import IconMoon from './moon';
import IconSun from './sun';

const Icon = ({ name }) => {
    switch (name) {
        case 'CV':
            return <IconCV />;
        case 'Diamond':
            return <BsDiamond />;
        case 'Medium':
            return <FaMediumM />;
        case 'Devto':
            return <FaDev />;
        case 'Email':
            return <MdEmail />;
        case 'Sun':
            return <IconSun />;
        case 'Codepen':
            return <IconCodepen />;
        case 'External':
            return <IconExternal />;
        case 'Folder':
            return <IconFolder />;
        case 'GitHub':
            return <IconGitHub />;
        case 'Moon':
            return <IconMoon />;
        case 'Linkedin':
            return <IconLinkedin />;
        case 'Location':
            return <IconLocation />;
        case 'Star':
            return <IconStar />;
        case 'Twitter':
            return <IconTwitter />;
        default:
            return <IconExternal />;
    }
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
