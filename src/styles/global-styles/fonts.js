import { css } from 'styled-components';

import InterThinWOFF from '@assets/fonts/Inter/Inter-Thin.woff';
import InterThinWOFF2 from '@assets/fonts/Inter/Inter-Thin.woff2';
import InterThinItalicWOFF from '@assets/fonts/Inter/Inter-ThinItalic.woff';
import InterThinItalicWOFF2 from '@assets/fonts/Inter/Inter-ThinItalic.woff2';
import InterExtraLightItalicWOFF from '@assets/fonts/Inter/Inter-ExtraLightItalic.woff';
import InterExtraLightItalicWOFF2 from '@assets/fonts/Inter/Inter-ExtraLightItalic.woff2';
import InterExtraLightWOFF from '@assets/fonts/Inter/Inter-ExtraLight.woff';
import InterExtraLightWOFF2 from '@assets/fonts/Inter/Inter-ExtraLight.woff2';
import InterLightWOFF from '@assets/fonts/Inter/Inter-Light.woff';
import InterLightWOFF2 from '@assets/fonts/Inter/Inter-Light.woff2';
import InterLightItalicWOFF from '@assets/fonts/Inter/Inter-LightItalic.woff';
import InterLightItalicWOFF2 from '@assets/fonts/Inter/Inter-LightItalic.woff2';
import InterRegularWOFF from '@assets/fonts/Inter/Inter-Regular.woff';
import InterRegularWOFF2 from '@assets/fonts/Inter/Inter-Regular.woff2';
import InterMediumWOFF from '@assets/fonts/Inter/Inter-Medium.woff';
import InterMediumWOFF2 from '@assets/fonts/Inter/Inter-Medium.woff2';
import InterMediumItalicWOFF from '@assets/fonts/Inter/Inter-MediumItalic.woff';
import InterMediumItalicWOFF2 from '@assets/fonts/Inter/Inter-MediumItalic.woff2';
import InterSemiBoldWOFF from '@assets/fonts/Inter/Inter-SemiBold.woff';
import InterSemiBoldWOFF2 from '@assets/fonts/Inter/Inter-SemiBold.woff2';
import InterSemiBoldItalicWOFF from '@assets/fonts/Inter/Inter-SemiBoldItalic.woff';
import InterSemiBoldItalicWOFF2 from '@assets/fonts/Inter/Inter-SemiBoldItalic.woff2';
import InterBoldWOFF from '@assets/fonts/Inter/Inter-Bold.woff';
import InterBoldWOFF2 from '@assets/fonts/Inter/Inter-Bold.woff2';
import InterBoldItalicWOFF from '@assets/fonts/Inter/Inter-BoldItalic.woff';
import InterBoldItalicWOFF2 from '@assets/fonts/Inter/Inter-BoldItalic.woff2';
import InterExtraBoldWOFF from '@assets/fonts/Inter/Inter-ExtraBold.woff';
import InterExtraBoldWOFF2 from '@assets/fonts/Inter/Inter-ExtraBold.woff2';
import InterExtraBoldItalicWOFF from '@assets/fonts/Inter/Inter-ExtraBoldItalic.woff';
import InterExtraBoldItalicWOFF2 from '@assets/fonts/Inter/Inter-ExtraBoldItalic.woff2';
import InterBlackWOFF from '@assets/fonts/Inter/Inter-Black.woff';
import InterBlackWOFF2 from '@assets/fonts/Inter/Inter-Black.woff2';
import InterBlackItalicWOFF from '@assets/fonts/Inter/Inter-BlackItalic.woff';
import InterBlackItalicWOFF2 from '@assets/fonts/Inter/Inter-BlackItalic.woff2';

import SFMonoRegularTTF from '@assets/fonts/SFMono/SFMono-Regular.ttf';
import SFMonoRegularWOFF from '@assets/fonts/SFMono/SFMono-Regular.woff';
import SFMonoRegularWOFF2 from '@assets/fonts/SFMono/SFMono-Regular.woff2';
import SFMonoRegularItalicTTF from '@assets/fonts/SFMono/SFMono-RegularItalic.ttf';
import SFMonoRegularItalicWOFF from '@assets/fonts/SFMono/SFMono-RegularItalic.woff';
import SFMonoRegularItalicWOFF2 from '@assets/fonts/SFMono/SFMono-RegularItalic.woff2';
import SFMonoMediumTTF from '@assets/fonts/SFMono/SFMono-Medium.ttf';
import SFMonoMediumWOFF from '@assets/fonts/SFMono/SFMono-Medium.woff';
import SFMonoMediumWOFF2 from '@assets/fonts/SFMono/SFMono-Medium.woff2';
import SFMonoMediumItalicTTF from '@assets/fonts/SFMono/SFMono-MediumItalic.ttf';
import SFMonoMediumItalicWOFF from '@assets/fonts/SFMono/SFMono-MediumItalic.woff';
import SFMonoMediumItalicWOFF2 from '@assets/fonts/SFMono/SFMono-MediumItalic.woff2';
import SFMonoSemiBoldTTF from '@assets/fonts/SFMono/SFMono-SemiBold.ttf';
import SFMonoSemiBoldWOFF from '@assets/fonts/SFMono/SFMono-SemiBold.woff';
import SFMonoSemiBoldWOFF2 from '@assets/fonts/SFMono/SFMono-SemiBold.woff2';
import SFMonoSemiBoldItalicTTF from '@assets/fonts/SFMono/SFMono-SemiBoldItalic.ttf';
import SFMonoSemiBoldItalicWOFF from '@assets/fonts/SFMono/SFMono-SemiBoldItalic.woff';
import SFMonoSemiBoldItalicWOFF2 from '@assets/fonts/SFMono/SFMono-SemiBoldItalic.woff2';

const fontFaces = css`
    @font-face {
        font-family: 'Inter';
        font-weight: 100;
        font-style: normal;
        font-display: swap;
        src: url(${InterThinWOFF2}) format('woff2'), url(${InterThinWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 100;
        font-style: italic;
        font-display: swap;
        src: url(${InterThinItalicWOFF2}) format('woff2'),
            url(${InterThinItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 200;
        font-style: normal;
        font-display: swap;
        src: url(${InterExtraLightWOFF2}) format('woff2'),
            url(${InterExtraLightWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 200;
        font-style: italic;
        font-display: swap;
        src: url(${InterExtraLightItalicWOFF2}) format('woff2'),
            url(${InterExtraLightItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 300;
        font-style: normal;
        font-display: swap;
        src: url(${InterLightWOFF2}) format('woff2'), url(${InterLightWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 300;
        font-style: italic;
        font-display: swap;
        src: url(${InterLightItalicWOFF2}) format('woff2'),
            url(${InterLightItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        src: url(${InterRegularWOFF2}) format('woff2'), url(${InterRegularWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url(${InterMediumWOFF2}) format('woff2'), url(${InterMediumWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 500;
        font-style: italic;
        font-display: swap;
        src: url(${InterMediumItalicWOFF2}) format('woff2'),
            url(${InterMediumItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 600;
        font-style: normal;
        font-display: swap;
        src: url(${InterSemiBoldWOFF2}) format('woff2'), url(${InterSemiBoldWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 600;
        font-style: italic;
        font-display: swap;
        src: url(${InterSemiBoldItalicWOFF2}) format('woff2'),
            url(${InterSemiBoldItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        src: url(${InterBoldWOFF2}) format('woff2'), url(${InterBoldWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 700;
        font-style: italic;
        font-display: swap;
        src: url(${InterBoldItalicWOFF2}) format('woff2'),
            url(${InterBoldItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 800;
        font-style: normal;
        font-display: swap;
        src: url(${InterExtraBoldWOFF2}) format('woff2'), url(${InterExtraBoldWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 800;
        font-style: italic;
        font-display: swap;
        src: url(${InterExtraBoldItalicWOFF2}) format('woff2'),
            url(${InterExtraBoldItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 900;
        font-style: normal;
        font-display: swap;
        src: url(${InterBlackWOFF2}) format('woff2'), url(${InterBlackWOFF}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-weight: 900;
        font-style: italic;
        font-display: swap;
        src: url(${InterBlackItalicWOFF2}) format('woff2'),
            url(${InterBlackItalicWOFF}) format('woff');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        src: url(${SFMonoRegularWOFF2}) format('woff2'), url(${SFMonoRegularWOFF}) format('woff'),
            url(${SFMonoRegularTTF}) format('truetype');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: normal;
        font-style: italic;
        font-display: swap;
        src: url(${SFMonoRegularItalicWOFF2}) format('woff2'),
            url(${SFMonoRegularItalicWOFF}) format('woff'),
            url(${SFMonoRegularItalicTTF}) format('truetype');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url(${SFMonoMediumWOFF2}) format('woff2'), url(${SFMonoMediumWOFF}) format('woff'),
            url(${SFMonoMediumTTF}) format('truetype');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: 500;
        font-style: italic;
        font-display: swap;
        src: url(${SFMonoMediumItalicWOFF2}) format('woff2'),
            url(${SFMonoMediumItalicWOFF}) format('woff'),
            url(${SFMonoMediumItalicTTF}) format('truetype');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: 600;
        font-style: normal;
        font-display: swap;
        src: url(${SFMonoSemiBoldWOFF2}) format('woff2'), url(${SFMonoSemiBoldWOFF}) format('woff'),
            url(${SFMonoSemiBoldTTF}) format('truetype');
    }
    @font-face {
        font-family: 'SF Mono';
        font-weight: 600;
        font-style: italic;
        font-display: swap;
        src: url(${SFMonoSemiBoldItalicWOFF2}) format('woff2'),
            url(${SFMonoSemiBoldItalicWOFF}) format('woff'),
            url(${SFMonoSemiBoldItalicTTF}) format('truetype');
    }
`;

export default fontFaces;
