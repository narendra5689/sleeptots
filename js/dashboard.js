/* =========================================================
   SLEEPTOTS PARENT DASHBOARD
   dashboard.js

   Supports:
   - Sidebar navigation
   - Separate dashboard sections
   - Mobile sidebar
   - Overlay
   - Profile dropdown
   - Quick actions
   - Consultation buttons
   - Message sending
   - Logout actions
   - Responsive orientation changes

   NOTE:
   - Dark mode is handled by global.js
   - RTL / LTR is handled by global.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const html = document.documentElement;
    const body = document.body;

    const dashboard = document.getElementById("dashboard");

    const sidebar =
        document.getElementById("dashboardSidebar");

    const overlay =
        document.getElementById("dashboardOverlay");

    const menuButton =
        document.getElementById("dashboardMenu");

    const profileTrigger =
        document.getElementById("profileTrigger");

    const profileDropdown =
        document.getElementById("profileDropdown");

    const topbarPageTitle =
        document.getElementById("topbarPageTitle");

    const sidebarLogout =
        document.getElementById("sidebarLogout");


    /* =====================================================
       SIDEBAR NAVIGATION
       ===================================================== */

    const navigationItems =
        document.querySelectorAll(
            ".st-dashboard-nav-item[data-dashboard-target]"
        );

    const dashboardSections =
        document.querySelectorAll(
            ".st-dashboard-section[data-section]"
        );

    const allTargetButtons =
        document.querySelectorAll(
            "[data-dashboard-target]"
        );


    /* =====================================================
       PAGE TITLES
       ===================================================== */

    const pageTitles = {

        overview:
            "Parent Overview",

        consultation:
            "Book Consultation",

        "sleep-plan":
            "Sleep Plan Progress",

        schedule:
            "Sleep Schedule",

        messages:
            "Messages"
    };


    /* =====================================================
       FIND SECTION
       ===================================================== */

    function getSection(target) {

        return document.querySelector(
            `.st-dashboard-section[data-section="${target}"]`
        );

    }


    /* =====================================================
       ACTIVATE SECTION
       ===================================================== */

    function activateSection(target) {

        if (!target) {
            return;
        }

        const targetSection =
            getSection(target);

        if (!targetSection) {
            return;
        }


        /* ---------------------------------------------
           Hide every section
           --------------------------------------------- */

        dashboardSections.forEach(function (section) {

            section.classList.remove("active");

            section.hidden = true;

            section.setAttribute(
                "aria-hidden",
                "true"
            );

        });


        /* ---------------------------------------------
           Show selected section
           --------------------------------------------- */

        targetSection.hidden = false;

        targetSection.classList.add("active");

        targetSection.setAttribute(
            "aria-hidden",
            "false"
        );


        /* ---------------------------------------------
           Active sidebar item
           --------------------------------------------- */

        navigationItems.forEach(function (item) {

            const itemTarget =
                item.getAttribute(
                    "data-dashboard-target"
                );

            const isActive =
                itemTarget === target;

            item.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                item.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                item.removeAttribute(
                    "aria-current"
                );

            }

        });


        /* ---------------------------------------------
           Update topbar title
           --------------------------------------------- */

        if (
            topbarPageTitle &&
            pageTitles[target]
        ) {

            topbarPageTitle.textContent =
                pageTitles[target];

        }


        /* ---------------------------------------------
           Close mobile sidebar
           --------------------------------------------- */

        closeSidebar();


        /* ---------------------------------------------
           Close profile
           --------------------------------------------- */

        closeProfile();


        /* ---------------------------------------------
           Scroll content to top
           --------------------------------------------- */

        const content =
            document.querySelector(
                ".st-dashboard-content"
            );

        if (content) {

            content.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* ---------------------------------------------
           Update browser hash
           --------------------------------------------- */

        if (
            window.history &&
            window.history.replaceState
        ) {

            window.history.replaceState(
                null,
                "",
                "#" + target
            );

        }

    }


    /* =====================================================
       SIDEBAR NAVIGATION EVENTS
       ===================================================== */

    navigationItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const target =
                    item.getAttribute(
                        "data-dashboard-target"
                    );

                activateSection(target);

            }
        );

    });


    /* =====================================================
       ALL DASHBOARD TARGET BUTTONS
       ===================================================== */

    allTargetButtons.forEach(function (button) {

        /*
         * Sidebar buttons are already handled above.
         * This prevents duplicate activation.
         */

        if (
            button.classList.contains(
                "st-dashboard-nav-item"
            )
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const target =
                    button.getAttribute(
                        "data-dashboard-target"
                    );

                activateSection(target);

            }
        );

    });


    /* =====================================================
       HASH / DIRECT SECTION LOADING
       ===================================================== */

    function loadSectionFromHash() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        if (
            hash &&
            getSection(hash)
        ) {

            activateSection(hash);

            return;
        }


        /* Default to overview */

        activateSection("overview");

    }


    window.addEventListener(
        "hashchange",
        function () {

            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim();

            if (
                hash &&
                getSection(hash)
            ) {

                activateSection(hash);

            }

        }
    );


    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("is-open");


        if (overlay) {

            overlay.classList.add(
                "is-visible"
            );

            overlay.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close dashboard menu"
            );

        }


        body.classList.add(
            "dashboard-sidebar-open"
        );

    }


    function closeSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove(
            "is-open"
        );


        if (overlay) {

            overlay.classList.remove(
                "is-visible"
            );

            overlay.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open dashboard menu"
            );

        }


        body.classList.remove(
            "dashboard-sidebar-open"
        );

    }


    function toggleSidebar() {

        if (!sidebar) {
            return;
        }

        if (
            sidebar.classList.contains(
                "is-open"
            )
        ) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }


    /* =====================================================
       MENU BUTTON
       ===================================================== */

    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleSidebar();

            }
        );

    }


    /* =====================================================
       OVERLAY
       ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION
       ===================================================== */

    navigationItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 991
                ) {

                    closeSidebar();

                }

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            closeSidebar();

            closeProfile();

        }
    );


    /* =====================================================
       PROFILE DROPDOWN
       ===================================================== */

    function openProfile() {

        if (
            !profileDropdown ||
            !profileTrigger
        ) {
            return;
        }

        profileDropdown.classList.add(
            "is-open"
        );

        profileTrigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeProfile() {

        if (
            !profileDropdown ||
            !profileTrigger
        ) {
            return;
        }

        profileDropdown.classList.remove(
            "is-open"
        );

        profileTrigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleProfile() {

        if (!profileDropdown) {
            return;
        }

        if (
            profileDropdown.classList.contains(
                "is-open"
            )
        ) {

            closeProfile();

        } else {

            openProfile();

        }

    }


    if (profileTrigger) {

        profileTrigger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleProfile();

            }
        );

    }


    /* =====================================================
       CLOSE PROFILE WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !profileDropdown ||
                !profileTrigger
            ) {
                return;
            }

            if (
                !profileDropdown.contains(
                    event.target
                ) &&
                !profileTrigger.contains(
                    event.target
                )
            ) {

                closeProfile();

            }

        }
    );


    /* =====================================================
       PROFILE MENU BUTTONS
       ===================================================== */

    const profileItems =
        document.querySelectorAll(
            ".st-profile-item"
        );


    profileItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const text =
                    item.textContent
                        .trim()
                        .toLowerCase();


                /* Profile */

                if (text === "profile") {

                    /*
                     * Your current HTML does not
                     * contain a dedicated profile
                     * section.
                     */

                    closeProfile();

                    return;
                }


                /* Settings */

                if (text === "settings") {

                    /*
                     * Your current HTML does not
                     * contain a settings section.
                     */

                    closeProfile();

                    return;
                }


                /* Logout */

                if (text === "logout") {

                    handleLogout();

                }

            }
        );

    });


    /* =====================================================
       NOTIFICATION BUTTON
       ===================================================== */

    const notificationButton =
        document.querySelector(
            ".notification-button"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                notificationButton
                    .classList.add(
                        "notification-read"
                    );

                const dot =
                    notificationButton
                        .querySelector(
                            ".notification-dot"
                        );

                if (dot) {

                    dot.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       CONSULTATION OPTIONS
       ===================================================== */

    const consultationOptions =
        document.querySelectorAll(
            ".consultation-option"
        );


    consultationOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    consultationOptions
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    option.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


    /* =====================================================
       MANAGE CONSULTATION
       ===================================================== */

    const manageButtons =
        document.querySelectorAll(
            ".booking-calendar-card .st-small-button"
        );


    manageButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    activateSection(
                        "consultation"
                    );

                }
            );

        }
    );


    /* =====================================================
       PLAN PROGRESS BUTTONS
       ===================================================== */

    const progressButtons =
        document.querySelectorAll(
            ".plan-step .st-small-button"
        );


    progressButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const parent =
                        button.closest(
                            ".plan-step"
                        );


                    if (parent) {

                        parent.classList.toggle(
                            "current"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       MESSAGE SYSTEM
       ===================================================== */

    const messageInput =
        document.querySelector(
            ".message-compose input"
        );

    const messageSendButton =
        document.querySelector(
            ".message-compose button"
        );

    const messageConversation =
        document.querySelector(
            ".message-conversation"
        );


    function sendMessage() {

        if (
            !messageInput ||
            !messageConversation
        ) {
            return;
        }


        const message =
            messageInput.value.trim();


        if (!message) {
            return;
        }


        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "message sent";


        const time =
            document.createElement(
                "span"
            );


        time.className =
            "message-time";


        time.textContent =
            "Just now";


        const text =
            document.createElement(
                "p"
            );


        text.textContent =
            message;


        messageElement.appendChild(
            time
        );

        messageElement.appendChild(
            text
        );


        messageConversation.appendChild(
            messageElement
        );


        messageInput.value =
            "";


        messageConversation.scrollTo({
            top:
                messageConversation.scrollHeight,
            behavior: "smooth"
        });

    }


    if (messageSendButton) {

        messageSendButton.addEventListener(
            "click",
            function () {

                sendMessage();

            }
        );

    }


    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();

                }

            }
        );

    }


    /* =====================================================
       START MESSAGE BUTTON
       ===================================================== */

    const startMessageButton =
        document.querySelector(
            ".consultant-profile-card .st-dashboard-primary"
        );


    if (startMessageButton) {

        startMessageButton.addEventListener(
            "click",
            function () {

                if (messageInput) {

                    messageInput.focus();

                }

            }
        );

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    function handleLogout() {

        const confirmed =
            window.confirm(
                "Are you sure you want to log out?"
            );


        if (!confirmed) {
            return;
        }


        /*
         * No backend/authentication system is
         * connected to this static dashboard yet.
         */

        window.location.href =
            "./login.html";

    }


    if (sidebarLogout) {

        sidebarLogout.addEventListener(
            "click",
            handleLogout
        );

    }


    const profileLogout =
        document.querySelector(
            ".profile-logout"
        );


    if (profileLogout) {

        profileLogout.addEventListener(
            "click",
            handleLogout
        );

    }


    /* =====================================================
       PREVENT BODY SCROLL WHEN MOBILE SIDEBAR OPEN
       ===================================================== */

    function updateMobileBodyState() {

        if (
            window.innerWidth <= 991 &&
            sidebar &&
            sidebar.classList.contains(
                "is-open"
            )
        ) {

            body.classList.add(
                "dashboard-sidebar-open"
            );

        } else {

            body.classList.remove(
                "dashboard-sidebar-open"
            );

        }

    }


    /* =====================================================
       RESPONSIVE RESIZE
       ===================================================== */

    function handleResize() {

        /*
         * When returning to desktop,
         * remove mobile sidebar state.
         */

        if (
            window.innerWidth > 991
        ) {

            closeSidebar();

        }


        updateMobileBodyState();

    }


    window.addEventListener(
        "resize",
        handleResize
    );


    window.addEventListener(
        "orientationchange",
        function () {

            setTimeout(
                function () {

                    handleResize();

                    window.dispatchEvent(
                        new Event("resize")
                    );

                },
                250
            );

        }
    );


    /* =====================================================
       INITIAL ACCESSIBILITY STATE
       ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (profileTrigger) {

        profileTrigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (overlay) {

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       INITIAL SECTION
       ===================================================== */

    const initialHash =
        window.location.hash
            .replace("#", "")
            .trim();


    if (
        initialHash &&
        getSection(initialHash)
    ) {

        activateSection(
            initialHash
        );

    } else {

        activateSection(
            "overview"
        );

    }


    /* =====================================================
       LUCIDE ICON REFRESH
       ===================================================== */

    /*
     * global.js / the inline script may already
     * initialize Lucide. This safely refreshes
     * icons when available.
     */

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {

        lucide.createIcons();

    }


    /* =====================================================
       PUBLIC DASHBOARD API
       ===================================================== */

    window.SleepTotsDashboard = {

        activateSection:
            activateSection,

        openSidebar:
            openSidebar,

        closeSidebar:
            closeSidebar,

        toggleSidebar:
            toggleSidebar,

        openProfile:
            openProfile,

        closeProfile:
            closeProfile

    };

});