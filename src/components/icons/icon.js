import React from 'react';
import PropTypes from 'prop-types';
import { MdEmail } from 'react-icons/md';
import { FaDev, FaMediumM } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { FiMoon } from 'react-icons/fi';

import IconCV from './cv';
import IconCodePen from './codepen';
import IconExternal from './external';
import IconFolder from './folder';
import IconGitHub from './github';
import IconLinkedIn from './linkedin';
import IconLocation from './location';
import IconStar from './star';
import IconTwitter from './twitter';
import IconSun from './sun';

const Icon = ({ name }) => {
    switch (name) {
        case 'Home':
            return <AiOutlineHome />;
        case 'CV':
            return <IconCV />;
        case 'ArrowRight':
            return <IoMdArrowRoundForward />;
        case 'Medium':
            return <FaMediumM />;
        case 'DevTo':
            return <FaDev />;
        case 'Email':
            return <MdEmail />;
        case 'Sun':
            return <IconSun />;
        case 'CodePen':
            return <IconCodePen />;
        case 'External':
            return <IconExternal />;
        case 'Folder':
            return <IconFolder />;
        case 'GitHub':
            return <IconGitHub />;
        case 'Moon':
            return <FiMoon />;
        case 'LinkedIn':
            return <IconLinkedIn />;
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
