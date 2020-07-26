// /**
//  * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/ssr-apis/
//  */

import React from 'react';
import Terser from 'terser';

import App from './src/components/app';

const setColorTheme = () => {
    const colorModeKey = 'color-mode';
    const colorModeCssProp = '--initial-color-mode';

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const prefersLightFromMQ = mql.matches;
    const persistedPreference = localStorage.getItem(colorModeKey);

    let colorMode = 'dark-mode';

    const hasUsedToggle = typeof persistedPreference === 'string';

    if (hasUsedToggle) {
        colorMode = persistedPreference;
    } else {
        colorMode = prefersLightFromMQ ? 'light-mode' : 'dark-mode';
    }

    const root = document.documentElement;
    root.style.setProperty(colorModeCssProp, colorMode);
    root.classList.add(colorMode);
};

const PreBodyScripts = () => {
    const boundFn = String(setColorTheme);
    const preBodyThemeScript = Terser.minify(`(${boundFn})();`).code;
    const preBodyDriftScript = Terser.minify(`"use strict";
    !function() {
    var t = window.driftt = window.drift = window.driftt || [];
    if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
        t.factory = function(e) {
        return function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
        };
        }, t.methods.forEach(function(e) {
        t[e] = t.factory(e);
        }), t.load = function(t) {
        var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
        o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
        var i = document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(o, i);
        };
    }
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('4cseihnb4wet');`).code;
    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: preBodyThemeScript,
                }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: preBodyDriftScript,
                }}
            />
        </>
    );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents(<PreBodyScripts />);
};

export const wrapPageElement = ({ element }) => {
    return <App>{element}</App>;
};
