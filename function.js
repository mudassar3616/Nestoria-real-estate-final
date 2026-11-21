
/* =====================================================
   NESTORIA REAL ESTATE WEBSITE
   COMPLETE GSAP ANIMATION SYSTEM
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
    // 2. HERO SECTION ANIMATION
    // =================================================

    const hero = document.querySelector(".hero-section");

    if (hero) {

        const heroTL = gsap.timeline({
            delay: 0.2
        });

        heroTL
            .from(".icon-list-name", {
                y: 30,
                opacity: 0,
                duration: 0.7
            })

            .from(".left h1", {
                y: 65,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            }, "-=0.3")

            .from(".left > p", {
                y: 25,
                opacity: 0,
                duration: 0.7
            }, "-=0.5")

            .from(".hero-footer > *", {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7
            }, "-=0.3");

        // Floating hero badge

        gsap.to(".icon-list-name svg", {
            y: -5,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

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
    // 4. FEATURE CARDS SECTION
    // =================================================

    revealOnScroll(".cards-main .card1", {
        y: 50,
        duration: 0.9
    });

    document.querySelectorAll(".card1").forEach(card => {

        const icon = card.querySelector("svg");

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -10,
                scale: 1.035,
                boxShadow: "0 15px 35px rgba(36,28,108,0.13)",
                duration: 0.35
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 12,
                    duration: 0.4,
                    ease: "back.out(2)"
                });
            }

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                scale: 1,
                clearProps: "boxShadow",
                duration: 0.4
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4
                });
            }

        });

    });


    // =================================================
    // 5. WHY CHOOSE NESTORIA SECTION
    // =================================================

    revealOnScroll(".why-left", {
        y: 55,
        duration: 1
    });

    revealOnScroll(".why-right", {
        y: 45,
        duration: 1
    });

    revealOnScroll(".feature-item", {
        y: 20,
        duration: 0.65
    });

    document.querySelectorAll(".feature-item").forEach(item => {

        const icon = item.querySelector(".check-icon");

        item.addEventListener("mouseenter", () => {

            gsap.to(item, {
                x: 9,
                duration: 0.3
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: "back.out(2)"
                });
            }

        });

        item.addEventListener("mouseleave", () => {

            gsap.to(item, {
                x: 0,
                duration: 0.3
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4
                });
            }

        });

    });


    // Why choose image zoom

    document.querySelectorAll(".why-right img").forEach(img => {

        const wrapper = img.parentElement;

        wrapper.addEventListener("mouseenter", () => {

            gsap.to(img, {
                scale: 1.07,
                duration: 0.8,
                ease: "power2.out"
            });

        });

        wrapper.addEventListener("mouseleave", () => {

            gsap.to(img, {
                scale: 1,
                duration: 0.8
            });

        });

    });


    // =================================================
    // 6. FEATURED PROPERTIES SECTION
    // =================================================

    revealOnScroll(".featured-header", {
        y: 30,
        duration: 0.8
    });

    revealOnScroll(".property-card", {
        y: 55,
        duration: 0.9
    });

    document.querySelectorAll(".property-card").forEach(card => {

        const image = card.querySelector(".property-image img");
        const button = card.querySelector(".property-btn");
        const badge = card.querySelector(".property-badge");

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -10,
                scale: 1.015,
                boxShadow: "0 18px 40px rgba(36,28,108,0.15)",
                duration: 0.4
            });

            if (image) {
                gsap.to(image, {
                    scale: 1.09,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (button) {
                gsap.to(button, {
                    scale: 1.07,
                    duration: 0.3
                });
            }

            if (badge) {
                gsap.to(badge, {
                    y: -3,
                    scale: 1.06,
                    duration: 0.3
                });
            }

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                scale: 1,
                clearProps: "boxShadow",
                duration: 0.4
            });

            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.65
                });
            }

            if (button) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3
                });
            }

            if (badge) {
                gsap.to(badge, {
                    y: 0,
                    scale: 1,
                    duration: 0.3
                });
            }

        });

    });


    // =================================================
    // 7. FAVORITE HEART ANIMATION
    // =================================================

    document.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", function () {

            this.classList.toggle("active");

            const icon = this.querySelector("i");

            if (!icon) return;

            const active = this.classList.contains("active");

            icon.classList.toggle("fa-solid", active);
            icon.classList.toggle("fa-regular", !active);

            gsap.fromTo(icon, {
                scale: 0.5,
                rotation: -25
            }, {
                scale: 1.25,
                rotation: 0,
                duration: 0.4,
                ease: "back.out(3)",
                onComplete: () => {
                    gsap.to(icon, {
                        scale: 1,
                        duration: 0.2
                    });
                }
            });

        });

    });


    // =================================================
    // 8. HOW IT WORKS SECTION
    // =================================================

    revealOnScroll(".section-heading", {
        y: 35
    });

    revealOnScroll(".step-card", {
        y: 50,
        duration: 0.9
    });

    document.querySelectorAll(".step-card").forEach(card => {

        const icon = card.querySelector(".step-icon");
        const number = card.querySelector(".step-number");

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -9,
                scale: 1.025,
                boxShadow: "0 15px 35px rgba(36,28,108,0.10)",
                duration: 0.35
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1.16,
                    rotation: 12,
                    duration: 0.45,
                    ease: "back.out(2)"
                });
            }

            if (number) {
                gsap.to(number, {
                    x: 6,
                    color: "#6f42e8",
                    duration: 0.3
                });
            }

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                scale: 1,
                clearProps: "boxShadow",
                duration: 0.35
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4
                });
            }

            if (number) {
                gsap.to(number, {
                    x: 0,
                    color: "#7562b9",
                    duration: 0.3
                });
            }

        });

    });


    // =================================================
    // 9. TESTIMONIALS SECTION
    // =================================================

    revealOnScroll(".testimonials-heading", {
        y: 35,
        duration: 0.8
    });

    revealOnScroll(".testimonial-card", {
        y: 45,
        duration: 0.9
    });

    document.querySelectorAll(".testimonial-card").forEach(card => {

        const image = card.querySelector(".client-image img");
        const stars = card.querySelectorAll(".client-stars i");

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -9,
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(36,28,108,0.10)",
                duration: 0.35
            });

            if (image) {
                gsap.to(image, {
                    scale: 1.12,
                    rotation: 4,
                    duration: 0.4
                });
            }

            gsap.fromTo(stars, {
                scale: 0.7
            }, {
                scale: 1.15,
                stagger: 0.06,
                duration: 0.3,
                ease: "back.out(2)",
                yoyo: true,
                repeat: 1
            });

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                scale: 1,
                clearProps: "boxShadow",
                duration: 0.35
            });

            if (image) {
                gsap.to(image, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4
                });
            }

            gsap.to(stars, {
                scale: 1,
                duration: 0.25
            });

        });

    });


    // =================================================
    // 10. CTA BANNER ANIMATION
    // =================================================

    revealOnScroll(".cta-banner", {
        y: 45,
        scale: 0.98,
        duration: 1
    });

    const cta = document.querySelector(".cta-banner");

    if (cta) {

        const icon = cta.querySelector(".cta-icon");
        const content = cta.querySelector(".cta-content");
        const button = cta.querySelector(".cta-button-wrapper");

        cta.addEventListener("mouseenter", () => {

            if (icon) {
                gsap.to(icon, {
                    rotation: 15,
                    scale: 1.15,
                    duration: 0.4,
                    ease: "back.out(2)"
                });
            }

            if (content) {
                gsap.to(content, {
                    x: 5,
                    duration: 0.3
                });
            }

            if (button) {
                gsap.to(button, {
                    x: -5,
                    duration: 0.3
                });
            }

        });

        cta.addEventListener("mouseleave", () => {

            gsap.to([icon, content, button].filter(Boolean), {
                rotation: 0,
                scale: 1,
                x: 0,
                duration: 0.4
            });

        });

    }


    // =================================================
    // 11. GENERAL BUTTON ANIMATIONS
    // =================================================

    document.querySelectorAll(
        ".get-started, .learn-more-btn, .property-btn, .cta-button, .get-started-btn, .Search"
    ).forEach(button => {

        button.addEventListener("mouseenter", () => {

            gsap.to(button, {
                y: -4,
                scale: 1.04,
                duration: 0.25
            });

        });

        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.25
            });

        });

    });




    // =================================================
    // 22. FINAL INITIALIZATION
    // =================================================

    console.log(
        "%c NESTORIA GSAP ANIMATIONS ACTIVATED ",
        "background:#241c6c;color:white;padding:10px;border-radius:5px;"
    );

});


async function loadComponent(selector, file) {
    const element = document.querySelector(selector);

    if (!element) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Unable to load ${file}`);
        }

        element.innerHTML = await response.text();

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("#header", "components/header.html");
    await loadComponent("#footer", "components/footer.html");
});