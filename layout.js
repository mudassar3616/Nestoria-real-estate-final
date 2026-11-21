/* =====================================================
   NESTORIA - SHARED HEADER & FOOTER ANIMATIONS
   Loaded on EVERY page after components.js so the header,
   navigation and footer behave the same everywhere.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded!");
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    gsap.defaults({
        ease: "power3.out"
    });

    // =================================================
    // 1. PAGE LOAD - HEADER ANIMATION
    // =================================================

    const header = document.querySelector(".header");

    if (header) {

        const headerTL = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        headerTL
            .from(".logo-main", {
                y: -35,
                opacity: 0,
                duration: 0.8
            })

            .from(".nav-bar li", {
                y: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5
            }, "-=0.5")

            .from(".header-right-side", {
                x: 35,
                opacity: 0,
                duration: 0.7
            }, "-=0.5");

    }



    // =================================================
    // 3. REUSABLE SCROLL REVEAL FUNCTION
    // =================================================

    function revealOnScroll(selector, options = {}) {

        document.querySelectorAll(selector).forEach(element => {

            gsap.set(element, {
                opacity: 0,
                y: options.y ?? 45,
                scale: options.scale ?? 1
            });

            const observer = new IntersectionObserver((entries, obs) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: options.duration ?? 0.85,
                        delay: options.delay ?? 0,
                        ease: options.ease ?? "power3.out",
                        clearProps: "opacity,transform"
                    });

                    obs.unobserve(element);

                });

            }, {
                threshold: options.threshold ?? 0.15
            });

            observer.observe(element);

        });

    }


    // =================================================
    // 12. NAVIGATION LINK ANIMATION
    // =================================================

    document.querySelectorAll(".nav-bar li a").forEach(link => {

        link.addEventListener("mouseenter", () => {

            gsap.to(link, {
                y: -3,
                color: "#6f42e8",
                duration: 0.25
            });

        });

        link.addEventListener("mouseleave", () => {

            gsap.to(link, {
                y: 0,
                color: "",
                duration: 0.25
            });

        });

    });


    // =================================================
    // 13. FOOTER SCROLL REVEAL
    // =================================================

    const footer = document.querySelector(".site-footer");

    if (footer) {

        revealOnScroll(".site-footer .footer-col", {
            y: 50,
            duration: 0.9
        });

        revealOnScroll(".site-footer .footer-bottom", {
            y: 25,
            duration: 0.8
        });


        // =================================================
        // 14. FOOTER COLUMN HEADING ANIMATION
        // =================================================

        footer.querySelectorAll(".footer-col h4").forEach(heading => {

            heading.addEventListener("mouseenter", () => {

                gsap.to(heading, {
                    x: 5,
                    color: "#6f42e8",
                    duration: 0.3
                });

            });

            heading.addEventListener("mouseleave", () => {

                gsap.to(heading, {
                    x: 0,
                    color: "",
                    duration: 0.3
                });

            });

        });


        // =================================================
        // 15. FOOTER LINKS ANIMATION
        // =================================================

        footer.querySelectorAll(".footer-col ul li a").forEach(link => {

            link.addEventListener("mouseenter", () => {

                gsap.to(link, {
                    x: 8,
                    color: "#8b70f3",
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

            link.addEventListener("mouseleave", () => {

                gsap.to(link, {
                    x: 0,
                    color: "",
                    duration: 0.3
                });

            });

        });


        // =================================================
        // 16. FOOTER CONTACT ICON ANIMATION
        // =================================================

        footer.querySelectorAll(".contact-info li span svg").forEach(icon => {

            const wrapper = icon.parentElement;

            wrapper.addEventListener("mouseenter", () => {

                gsap.to(icon, {
                    scale: 1.25,
                    rotation: 10,
                    duration: 0.35,
                    ease: "back.out(2)"
                });

            });

            wrapper.addEventListener("mouseleave", () => {

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.35
                });

            });

        });


        // =================================================
        // 17. SOCIAL ICON ANIMATIONS
        // =================================================

        footer.querySelectorAll(".social-links a").forEach((social, index) => {

            social.addEventListener("mouseenter", () => {

                gsap.to(social, {
                    y: -8,
                    scale: 1.18,
                    rotation: index % 2 === 0 ? 10 : -10,
                    backgroundColor: "#6f42e8",
                    color: "#ffffff",
                    duration: 0.3,
                    ease: "back.out(2)"
                });

            });

            social.addEventListener("mouseleave", () => {

                gsap.to(social, {
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    backgroundColor: "",
                    color: "",
                    duration: 0.3
                });

            });

        });


        // =================================================
        // 18. FOOTER LOGO ANIMATION
        // =================================================

        const footerLogo = footer.querySelector(".footer-logo");

        if (footerLogo) {

            const logoIcon = footerLogo.querySelector("svg");

            footerLogo.addEventListener("mouseenter", () => {

                if (logoIcon) {
                    gsap.to(logoIcon, {
                        rotation: 15,
                        scale: 1.2,
                        duration: 0.4,
                        ease: "back.out(2)"
                    });
                }

                gsap.to(footerLogo, {
                    color: "#6f42e8",
                    duration: 0.3
                });

            });

            footerLogo.addEventListener("mouseleave", () => {

                if (logoIcon) {
                    gsap.to(logoIcon, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.4
                    });
                }

                gsap.to(footerLogo, {
                    color: "",
                    duration: 0.3
                });

            });

        }


        // =================================================
        // 19. NEWSLETTER INPUT ANIMATION
        // =================================================

        const input = footer.querySelector(".newsletter-form input");
        const subscribeButton = footer.querySelector(".newsletter-form button");

        if (input) {

            input.addEventListener("focus", () => {

                gsap.to(input, {
                    scale: 1.025,
                    duration: 0.25
                });

            });

            input.addEventListener("blur", () => {

                gsap.to(input, {
                    scale: 1,
                    duration: 0.25
                });

            });

        }

        if (subscribeButton) {

            subscribeButton.addEventListener("mouseenter", () => {

                gsap.to(subscribeButton, {
                    y: -3,
                    scale: 1.06,
                    duration: 0.25
                });

            });

            subscribeButton.addEventListener("mouseleave", () => {

                gsap.to(subscribeButton, {
                    y: 0,
                    scale: 1,
                    duration: 0.25
                });

            });

        }


        // =================================================
        // 20. HUGE NESTORIA BRANDING ANIMATION
        // =================================================

        const branding = footer.querySelector(".footer-branding");

        if (branding) {

            const text = branding.textContent.trim();

            branding.setAttribute("aria-label", text);

            branding.innerHTML = Array.from(text).map(letter => {

                return `<span class="branding-letter" aria-hidden="true">${
                    letter === " " ? "&nbsp;" : letter
                }</span>`;

            }).join("");

            const letters = branding.querySelectorAll(".branding-letter");

            gsap.set(letters, {
                y: 80,
                opacity: 0,
                rotationX: -75,
                scale: 0.7,
                transformOrigin: "center bottom"
            });


            // Letter-by-letter scroll reveal

            const brandingObserver = new IntersectionObserver((entries, obs) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    gsap.to(letters, {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "back.out(1.5)",
                        clearProps: "transform"
                    });

                    obs.unobserve(entry.target);

                });

            }, {
                threshold: 0.15
            });

            brandingObserver.observe(branding);


            // Branding hover wave

            branding.addEventListener("mouseenter", () => {

                gsap.fromTo(letters, {
                    y: 0
                }, {
                    y: -15,
                    duration: 0.35,
                    stagger: {
                        each: 0.045,
                        from: "start"
                    },
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });

            });

        }

    }


    // =================================================
    // 21. FOOTER BOTTOM TEXT HOVER
    // =================================================

    document.querySelectorAll(".footer-bottom p").forEach(text => {

        text.addEventListener("mouseenter", () => {

            gsap.to(text, {
                y: -3,
                color: "#6f42e8",
                duration: 0.3
            });

        });

        text.addEventListener("mouseleave", () => {

            gsap.to(text, {
                y: 0,
                color: "",
                duration: 0.3
            });

        });

    });

});
