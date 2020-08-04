import React from 'react';
import PropTypes from 'prop-types';
import { MdEmail } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { FaDev } from 'react-icons/fa';
import { IoMdArrowRoundForward, IoMdArrowBack } from 'react-icons/io';
import { FiMoon } from 'react-icons/fi';

import IconCodePen from './codepen';
import IconExternal from './external';
import IconGitHub from './github';
import IconLinkedIn from './linkedin';
import IconTwitter from './twitter';
import IconSun from './sun';
import IconLogo from './logo';
import IconAnchor from './anchor';

const Icon = ({ name }) => {
    const icons = {
        home: AiOutlineHome,
        'arrow-left': IoMdArrowBack,
        'arrow-right': IoMdArrowRoundForward,
        email: MdEmail,
        anchor: IconAnchor,
        external: IconExternal,
        sun: IconSun,
        moon: FiMoon,
        logo: IconLogo,
        GitHub: IconGitHub,
        DevTo: FaDev,
        CodePen: IconCodePen,
        LinkedIn: IconLinkedIn,
        Twitter: IconTwitter,
    };
    const Component = icons[name];

    return <Component />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
