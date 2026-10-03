/* ==========================================================================
   SleepTots — Global JavaScript
   --------------------------------------------------------------------------
   Global functionality only:

   - Persistent Dark Mode
   - Persistent RTL across ALL pages
   - Navbar scroll state
   - Responsive mobile top-dropdown menu
   - Mobile Home dropdown
   - Current-page navigation state
   - Outside-click handling
   - Escape-key handling
   - Scroll reveal animations
   - Animated counters
   - Subtle parallax
   - Lucide refresh
   - Newsletter form
   - Contact form
   - Login form
   - Register / Signup form

   No framework.
   Plain JavaScript only.
   ========================================================================== */

(function () {

    "use strict";


    /* ==========================================================================
       CONSTANTS
       ========================================================================== */

    var THEME_KEY = "sleeptots-theme";

    /*
     * IMPORTANT:
     * This is the ONLY RTL storage key used anywhere.
     *
     * Every page:
     * Home
     * About
     * Services
     * Contact
     * Login
     * Signup
     * Dashboard
     *
     * reads and writes this same key.
     */
    var RTL_KEY = "sleeptots-rtl";

    var DARK = "dark";
    var LIGHT = "light";


    /* ==========================================================================
       DOM READY
       ========================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initTheme();

            initRTL();

            initNavbarScroll();

            initMobileMenu();

            initHomeDropdownMobile();

            initCurrentPage();

            initOutsideClick();

            initScrollReveal();

            initCounters();

            initParallax();

            initForms();

            initLucideRefresh();

        }
    );


    /* ==========================================================================
       DARK MODE
       ========================================================================== */

    function initTheme() {

        var savedTheme =
            localStorage.getItem(
                THEME_KEY
            );


        /*
         * Default to light mode.
         */

        if (
            savedTheme !== DARK &&
            savedTheme !== LIGHT
        ) {

            savedTheme = LIGHT;

        }


        applyTheme(
            savedTheme
        );


        var toggles =
            document.querySelectorAll(
                "[data-theme-toggle]"
            );


        if (!toggles.length) {
            return;
        }


        /*
         * Set initial icons.
         */

        toggles.forEach(
            function (toggle) {

                updateThemeIcon(
                    toggle,
                    savedTheme
                );

            }
        );


        /*
         * Theme buttons.
         */

        toggles.forEach(
            function (toggle) {

                toggle.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        var currentTheme =
                            document.documentElement
                                .getAttribute(
                                    "data-theme"
                                );


                        var nextTheme =
                            currentTheme === DARK
                                ? LIGHT
                                : DARK;


                        applyTheme(
                            nextTheme
                        );


                        localStorage.setItem(
                            THEME_KEY,
                            nextTheme
                        );


                        /*
                         * Update every theme control.
                         */

                        document
                            .querySelectorAll(
                                "[data-theme-toggle]"
                            )
                            .forEach(
                                function (button) {

                                    updateThemeIcon(
                                        button,
                                        nextTheme
                                    );

                                }
                            );


                        refreshLucide();

                    }
                );

            }
        );

    }


    /* ==========================================================================
       APPLY THEME
       ========================================================================== */

    function applyTheme(theme) {

        if (
            theme !== DARK &&
            theme !== LIGHT
        ) {

            theme = LIGHT;

        }


        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

    }


    /* ==========================================================================
       THEME ICON
       ========================================================================== */

    function updateThemeIcon(
        button,
        theme
    ) {

        if (!button) {
            return;
        }


        var sunIcon =
            button.querySelector(
                "[data-lucide='sun']"
            );


        var moonIcon =
            button.querySelector(
                "[data-lucide='moon']"
            );


        if (theme === DARK) {

            if (sunIcon) {

                sunIcon.style.display =
                    "block";

            }


            if (moonIcon) {

                moonIcon.style.display =
                    "none";

            }

        } else {

            if (sunIcon) {

                sunIcon.style.display =
                    "none";

            }


            if (moonIcon) {

                moonIcon.style.display =
                    "block";

            }

        }

    }


    /* ==========================================================================
       RTL
       --------------------------------------------------------------------------
       IMPORTANT:

       This is the SINGLE RTL SYSTEM for the entire website.

       Storage:
           sleeptots-rtl

       HTML:
           data-rtl-toggle

       Label:
           .rtl-label

       Do NOT create another RTL system inside individual pages.
       ========================================================================== */

    function initRTL() {

        /*
         * Read the SAME value on every page.
         */

        var savedValue =
            localStorage.getItem(
                RTL_KEY
            );


        /*
         * Only "true" means RTL.
         * Everything else means LTR.
         */

        var savedRTL =
            savedValue === "true";


        /*
         * Apply the saved direction
         * BEFORE attaching the buttons.
         */

        applyRTL(
            savedRTL
        );


        /*
         * Find ALL RTL controls on the current page.
         */

        var toggles =
            document.querySelectorAll(
                "[data-rtl-toggle]"
            );


        /*
         * Update button labels.
         */

        toggles.forEach(
            function (toggle) {

                updateRTLLabel(
                    toggle,
                    savedRTL
                );

            }
        );


        /*
         * If this page has no RTL button,
         * the saved direction has still already
         * been applied above.
         */

        if (!toggles.length) {
            return;
        }


        /*
         * Add the same handler to every RTL button.
         */

        toggles.forEach(
            function (toggle) {

                /*
                 * Prevent duplicate listeners.
                 */

                if (
                    toggle.dataset.rtlInitialized ===
                    "true"
                ) {

                    return;

                }


                toggle.dataset.rtlInitialized =
                    "true";


                toggle.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        /*
                         * Read CURRENT HTML direction.
                         */

                        var currentRTL =
                            document.documentElement
                                .getAttribute(
                                    "dir"
                                ) === "rtl";


                        /*
                         * Toggle it.
                         */

                        var nextRTL =
                            !currentRTL;


                        /*
                         * Apply immediately.
                         */

                        applyRTL(
                            nextRTL
                        );


                        /*
                         * Save globally.
                         */

                        localStorage.setItem(
                            RTL_KEY,
                            String(nextRTL)
                        );


                        /*
                         * Update every RTL button
                         * currently on the page.
                         */

                        document
                            .querySelectorAll(
                                "[data-rtl-toggle]"
                            )
                            .forEach(
                                function (button) {

                                    updateRTLLabel(
                                        button,
                                        nextRTL
                                    );

                                }
                            );


                        refreshLucide();

                    }
                );

            }
        );

    }


    /* ==========================================================================
       APPLY RTL
       ========================================================================== */

    function applyRTL(
        isRTL
    ) {

        var html =
            document.documentElement;


        if (isRTL) {

            html.setAttribute(
                "dir",
                "rtl"
            );


            html.setAttribute(
                "lang",
                "ar"
            );


        } else {

            html.setAttribute(
                "dir",
                "ltr"
            );


            html.setAttribute(
                "lang",
                "en"
            );

        }

    }


    /* ==========================================================================
       RTL LABEL
       ========================================================================== */

    function updateRTLLabel(
        button,
        isRTL
    ) {

        if (!button) {
            return;
        }


        var label =
            button.querySelector(
                ".rtl-label"
            );


        /*
         * If the page does not use a text span,
         * do nothing.
         */

        if (!label) {
            return;
        }


        /*
         * LTR page:
         *     button says RTL
         *
         * RTL page:
         *     button says LTR
         */

        label.textContent =
            isRTL
                ? "LTR"
                : "RTL";

    }


    /* ==========================================================================
       NAVBAR SCROLL
       ========================================================================== */

    function initNavbarScroll() {

        var navbar =
            document.querySelector(
                ".st-navbar"
            );


        if (!navbar) {
            return;
        }


        function updateNavbar() {

            if (
                window.scrollY > 10
            ) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }


        updateNavbar();


        window.addEventListener(
            "scroll",
            updateNavbar,
            {
                passive: true
            }
        );

    }


    /* ==========================================================================
       MOBILE MENU
       ========================================================================== */

    function initMobileMenu() {

        var hamburger =
            document.querySelector(
                ".st-hamburger"
            );


        var menu =
            document.querySelector(
                ".st-mobile-menu"
            );


        var overlay =
            document.querySelector(
                ".st-mobile-overlay"
            );


        if (
            !hamburger ||
            !menu
        ) {

            return;

        }


        function openMenu() {

            menu.classList.add(
                "is-open"
            );


            if (overlay) {

                overlay.classList.add(
                    "is-open"
                );

            }


            hamburger.classList.add(
                "is-open"
            );


            hamburger.setAttribute(
                "aria-expanded",
                "true"
            );


            hamburger.setAttribute(
                "aria-label",
                "Close menu"
            );

        }


        function closeMenu() {

            menu.classList.remove(
                "is-open"
            );


            if (overlay) {

                overlay.classList.remove(
                    "is-open"
                );

            }


            hamburger.classList.remove(
                "is-open"
            );


            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );


            hamburger.setAttribute(
                "aria-label",
                "Open menu"
            );


            closeMobileHomeDropdown();

        }


        hamburger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    menu.classList.contains(
                        "is-open"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        if (overlay) {

            overlay.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        }


        var menuLinks =
            menu.querySelectorAll(
                "a[href]"
            );


        menuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                    }
                );

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    menu.classList.contains(
                        "is-open"
                    )
                ) {

                    closeMenu();

                }

            }
        );


        window.sleepTotsCloseMobileMenu =
            closeMenu;

    }


    /* ==========================================================================
       MOBILE HOME DROPDOWN
       ========================================================================== */

    function initHomeDropdownMobile() {

        var toggle =
            document.querySelector(
                ".st-mobile-nav-link[data-home-toggle]"
            );


        var submenu =
            document.querySelector(
                ".st-mobile-submenu"
            );


        if (
            !toggle ||
            !submenu
        ) {

            return;

        }


        submenu.classList.remove(
            "is-open"
        );


        toggle.classList.remove(
            "is-expanded"
        );


        toggle.setAttribute(
            "aria-expanded",
            "false"
        );


        toggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                var isOpen =
                    submenu.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    closeMobileHomeDropdown();

                } else {

                    closeAllMobileDropdowns();


                    submenu.classList.add(
                        "is-open"
                    );


                    toggle.classList.add(
                        "is-expanded"
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );


        var submenuLinks =
            submenu.querySelectorAll(
                "a[href]"
            );


        submenuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileHomeDropdown();


                        if (
                            typeof window
                                .sleepTotsCloseMobileMenu ===
                            "function"
                        ) {

                            window
                                .sleepTotsCloseMobileMenu();

                        }

                    }
                );

            }
        );

    }


    /* ==========================================================================
       CLOSE MOBILE HOME DROPDOWN
       ========================================================================== */

    function closeMobileHomeDropdown() {

        var submenu =
            document.querySelector(
                ".st-mobile-submenu"
            );


        var toggle =
            document.querySelector(
                ".st-mobile-nav-link[data-home-toggle]"
            );


        if (submenu) {

            submenu.classList.remove(
                "is-open"
            );

        }


        if (toggle) {

            toggle.classList.remove(
                "is-expanded"
            );


            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* ==========================================================================
       CLOSE ALL MOBILE DROPDOWNS
       ========================================================================== */

    function closeAllMobileDropdowns() {

        closeMobileHomeDropdown();

    }


    /* ==========================================================================
       OUTSIDE CLICK
       ========================================================================== */

    function initOutsideClick() {

        document.addEventListener(
            "click",
            function (event) {

                var mobileMenu =
                    document.querySelector(
                        ".st-mobile-menu"
                    );


                var hamburger =
                    document.querySelector(
                        ".st-hamburger"
                    );


                var homeToggle =
                    document.querySelector(
                        ".st-mobile-nav-link[data-home-toggle]"
                    );


                var homeSubmenu =
                    document.querySelector(
                        ".st-mobile-submenu"
                    );


                if (
                    homeSubmenu &&
                    homeSubmenu.classList.contains(
                        "is-open"
                    )
                ) {

                    if (
                        !homeSubmenu.contains(
                            event.target
                        ) &&
                        (
                            !homeToggle ||
                            !homeToggle.contains(
                                event.target
                            )
                        )
                    ) {

                        closeMobileHomeDropdown();

                    }

                }


                if (
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "is-open"
                    )
                ) {

                    if (
                        !mobileMenu.contains(
                            event.target
                        ) &&
                        (
                            !hamburger ||
                            !hamburger.contains(
                                event.target
                            )
                        )
                    ) {

                        if (
                            typeof window
                                .sleepTotsCloseMobileMenu ===
                            "function"
                        ) {

                            window
                                .sleepTotsCloseMobileMenu();

                        }

                    }

                }

            }
        );

    }


    /* ==========================================================================
       CURRENT PAGE NAVIGATION
       ========================================================================== */

    function initCurrentPage() {

        var currentPath =
            normalizePath(
                window.location.pathname
            );


        var navLinks =
            document.querySelectorAll(
                ".st-nav-link[href], " +
                ".st-home-dropdown a[href], " +
                ".st-mobile-menu a[href]"
            );


        navLinks.forEach(
            function (link) {

                var href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {
                    return;
                }


                if (
                    href.indexOf("http://") === 0 ||
                    href.indexOf("https://") === 0 ||
                    href.indexOf("//") === 0
                ) {

                    return;

                }


                if (
                    href.charAt(0) === "#"
                ) {

                    return;

                }


                var linkPath =
                    getLinkPath(
                        href
                    );


                if (
                    linkPath === currentPath
                ) {

                    link.setAttribute(
                        "data-current",
                        "true"
                    );

                } else {

                    link.removeAttribute(
                        "data-current"
                    );

                }

            }
        );


        var homeLinks =
            document.querySelectorAll(
                "a[href*='home1'], " +
                "a[href*='home2']"
            );


        var isHomePage =
            homeLinks.length &&
            Array.prototype.some.call(
                homeLinks,
                function (link) {

                    var href =
                        link.getAttribute(
                            "href"
                        );


                    return (
                        href &&
                        getLinkPath(
                            href
                        ) === currentPath
                    );

                }
            );


        if (isHomePage) {

            var homeButtons =
                document.querySelectorAll(
                    ".st-nav-link[data-home-toggle], " +
                    ".st-mobile-nav-link[data-home-toggle]"
                );


            homeButtons.forEach(
                function (button) {

                    button.setAttribute(
                        "data-current",
                        "true"
                    );

                }
            );

        }

    }


    /* ==========================================================================
       NORMALIZE PATH
       ========================================================================== */

    function normalizePath(path) {

        if (!path) {
            return "/";
        }


        path =
            path.split("?")[0];


        path =
            path.split("#")[0];


        try {

            path =
                decodeURIComponent(
                    path
                );

        } catch (error) {

            /*
             * Keep original path.
             */

        }


        path =
            path.replace(
                /\\/g,
                "/"
            );


        path =
            path.replace(
                /\/+/g,
                "/"
            );


        if (
            path.length > 1 &&
            path.endsWith("/")
        ) {

            path =
                path.slice(
                    0,
                    -1
                );

        }


        if (!path) {

            path = "/";

        }


        return path.toLowerCase();

    }


    /* ==========================================================================
       GET LINK PATH
       ========================================================================== */

    function getLinkPath(
        href
    ) {

        try {

            var url =
                new URL(
                    href,
                    window.location.href
                );


            return normalizePath(
                url.pathname
            );

        } catch (error) {

            return normalizePath(
                href
            );

        }

    }


    /* ==========================================================================
       SCROLL REVEAL
       ========================================================================== */

    function initScrollReveal() {

        var elements =
            document.querySelectorAll(
                ".reveal, " +
                ".reveal-left, " +
                ".reveal-right, " +
                ".reveal-scale, " +
                ".reveal-fade"
            );


        if (!elements.length) {
            return;
        }


        var prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );


            return;

        }


        var observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    /* ==========================================================================
       ANIMATED COUNTERS
       ========================================================================== */

    function initCounters() {

        var counters =
            document.querySelectorAll(
                "[data-counter]"
            );


        if (!counters.length) {
            return;
        }


        if (
            !("IntersectionObserver" in window)
        ) {

            counters.forEach(
                function (element) {

                    element.textContent =
                        element.getAttribute(
                            "data-counter"
                        ) +
                        (
                            element.getAttribute(
                                "data-suffix"
                            ) || ""
                        );

                }
            );


            return;

        }


        var observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        counters.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    /* ==========================================================================
       COUNTER ANIMATION
       ========================================================================== */

    function animateCounter(
        element
    ) {

        var target =
            parseInt(
                element.getAttribute(
                    "data-counter"
                ),
                10
            );


        if (
            isNaN(target)
        ) {

            return;

        }


        var suffix =
            element.getAttribute(
                "data-suffix"
            ) || "";


        var duration =
            1800;


        var startTime =
            null;


        function step(
            timestamp
        ) {

            if (!startTime) {

                startTime =
                    timestamp;

            }


            var progress =
                Math.min(
                    (
                        timestamp -
                        startTime
                    ) /
                    duration,
                    1
                );


            var eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            var value =
                Math.floor(
                    eased * target
                );


            element.textContent =
                value + suffix;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    step
                );

            } else {

                element.textContent =
                    target + suffix;

            }

        }


        requestAnimationFrame(
            step
        );

    }


    /* ==========================================================================
       PARALLAX
       ========================================================================== */

    function initParallax() {

        var elements =
            document.querySelectorAll(
                "[data-parallax]"
            );


        if (!elements.length) {
            return;
        }


        var prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            prefersReducedMotion
        ) {

            return;

        }


        var ticking =
            false;


        function updateParallax() {

            var scrollY =
                window.scrollY;


            elements.forEach(
                function (element) {

                    var speed =
                        parseFloat(
                            element.getAttribute(
                                "data-parallax"
                            )
                        ) || 0.3;


                    var offset =
                        element
                            .getBoundingClientRect()
                            .top +
                        window.scrollY;


                    var difference =
                        scrollY - offset;


                    var translateY =
                        difference * speed;


                    element.style.transform =
                        "translateY(" +
                        translateY +
                        "px)";

                }
            );


            ticking =
                false;

        }


        window.addEventListener(
            "scroll",
            function () {

                if (!ticking) {

                    requestAnimationFrame(
                        updateParallax
                    );


                    ticking =
                        true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* ==========================================================================
       LUCIDE REFRESH
       ========================================================================== */

    function refreshLucide() {

        if (
            typeof lucide !== "undefined" &&
            typeof lucide.createIcons === "function"
        ) {

            lucide.createIcons();

        }

    }


    /* ==========================================================================
       LUCIDE INITIALIZATION
       ========================================================================== */

    function initLucideRefresh() {

        if (
            typeof lucide !== "undefined" &&
            typeof lucide.createIcons === "function"
        ) {

            lucide.createIcons();

        }

    }


    /* ==========================================================================
       FORMS
       ========================================================================== */

    function initForms() {

        initNewsletterForms();

        initContactForm();

        initLoginForm();

        initRegisterForm();

    }


    /* ==========================================================================
       NEWSLETTER
       ========================================================================== */

    function initNewsletterForms() {

        var forms =
            document.querySelectorAll(
                ".st-newsletter-form"
            );


        forms.forEach(
            function (form) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();


                        var input =
                            form.querySelector(
                                'input[type="email"]'
                            );


                        var button =
                            form.querySelector(
                                "button"
                            );


                        if (
                            !input ||
                            !input.value.trim() ||
                            !button
                        ) {

                            return;

                        }


                        var originalText =
                            button.innerHTML;


                        button.innerHTML =
                            "Subscribed!";


                        button.disabled =
                            true;


                        input.value =
                            "";


                        setTimeout(
                            function () {

                                button.innerHTML =
                                    originalText;


                                button.disabled =
                                    false;


                                refreshLucide();

                            },
                            2500
                        );

                    }
                );

            }
        );

    }


    /* ==========================================================================
       CONTACT FORM
       ========================================================================== */

    function initContactForm() {

        var contactForm =
            document.querySelector(
                "#contact-form"
            );


        if (!contactForm) {
            return;
        }


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                var button =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (!button) {
                    return;
                }


                var originalText =
                    button.innerHTML;


                button.innerHTML =
                    "Message Sent!";


                button.disabled =
                    true;


                contactForm.reset();


                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;


                        button.disabled =
                            false;


                        refreshLucide();

                    },
                    3000
                );

            }
        );

    }


    /* ==========================================================================
       LOGIN FORM
       ========================================================================== */

    function initLoginForm() {

        var loginForm =
            document.querySelector(
                "#login-form"
            );


        if (!loginForm) {
            return;
        }


        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                var button =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );


                if (!button) {
                    return;
                }


                var originalText =
                    button.innerHTML;


                button.innerHTML =
                    "Signing in...";


                button.disabled =
                    true;


                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;


                        button.disabled =
                            false;


                        refreshLucide();

                    },
                    2000
                );

            }
        );

    }


    /* ==========================================================================
       REGISTER / SIGNUP FORM
       --------------------------------------------------------------------------
       Handles:

       - #register-form
       - #signupForm
       - Password visibility
       - Confirm password
       - Form validation
       - Submit state
       ========================================================================== */

    function initRegisterForm() {

        var registerForm =
            document.querySelector(
                "#register-form, #signupForm"
            );


        if (!registerForm) {
            return;
        }


        /* ----------------------------------------------------------------------
           PASSWORD VISIBILITY
           ---------------------------------------------------------------------- */

        var passwordToggles =
            registerForm.querySelectorAll(
                ".slt-signup-password-toggle"
            );


        passwordToggles.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        var targetId =
                            button.getAttribute(
                                "data-target"
                            );


                        if (!targetId) {
                            return;
                        }


                        var target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        var icon =
                            button.querySelector(
                                "i"
                            );


                        var showingPassword =
                            target.type ===
                            "text";


                        target.type =
                            showingPassword
                                ? "password"
                                : "text";


                        button.setAttribute(
                            "aria-label",
                            showingPassword
                                ? "Show password"
                                : "Hide password"
                        );


                        if (icon) {

                            icon.setAttribute(
                                "data-lucide",
                                showingPassword
                                    ? "eye"
                                    : "eye-off"
                            );

                        }


                        refreshLucide();

                    }
                );

            }
        );


        /* ----------------------------------------------------------------------
           PASSWORD VALIDATION
           ---------------------------------------------------------------------- */

        var password =
            document.getElementById(
                "password"
            );


        var confirmPassword =
            document.getElementById(
                "confirmPassword"
            );


        /* ----------------------------------------------------------------------
           REGISTER SUBMIT
           ---------------------------------------------------------------------- */

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /*
                 * Check passwords.
                 */

                if (
                    password &&
                    confirmPassword
                ) {

                    confirmPassword.setCustomValidity(
                        ""
                    );


                    if (
                        password.value !==
                        confirmPassword.value
                    ) {

                        confirmPassword.setCustomValidity(
                            "Passwords do not match."
                        );


                        registerForm.reportValidity();


                        return;

                    }

                }


                /*
                 * Native HTML validation.
                 */

                if (
                    !registerForm.checkValidity()
                ) {

                    registerForm.reportValidity();


                    return;

                }


                var button =
                    registerForm.querySelector(
                        'button[type="submit"]'
                    );


                if (!button) {
                    return;
                }


                var originalText =
                    button.innerHTML;


                button.innerHTML =
                    "Account Created!";


                button.disabled =
                    true;


                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;


                        button.disabled =
                            false;


                        refreshLucide();

                    },
                    2500
                );

            }
        );

    }


    /* ==========================================================================
       WINDOW RESIZE
       ========================================================================== */

    var resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        if (
                            window.innerWidth >= 992
                        ) {

                            var menu =
                                document.querySelector(
                                    ".st-mobile-menu"
                                );


                            var overlay =
                                document.querySelector(
                                    ".st-mobile-overlay"
                                );


                            var hamburger =
                                document.querySelector(
                                    ".st-hamburger"
                                );


                            if (menu) {

                                menu.classList.remove(
                                    "is-open"
                                );

                            }


                            if (overlay) {

                                overlay.classList.remove(
                                    "is-open"
                                );

                            }


                            if (hamburger) {

                                hamburger.classList.remove(
                                    "is-open"
                                );


                                hamburger.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }


                            closeMobileHomeDropdown();

                        }

                    },
                    150
                );

        }
    );


})();


/* ==========================================================================
   CONTACT PAGE REVEAL ANIMATIONS
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        var contactRevealElements =
            document.querySelectorAll(
                ".reveal-contact, " +
                ".reveal-contact-left, " +
                ".reveal-contact-right"
            );


        if (
            !contactRevealElements.length
        ) {

            return;

        }


        var prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            contactRevealElements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );


            return;

        }


        var contactObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            contactObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        contactRevealElements.forEach(
            function (element) {

                contactObserver.observe(
                    element
                );

            }
        );

    }
);