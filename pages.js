/* =====================================================
   NESTORIA - INNER PAGES
   Listings, favorites, blog filters, FAQ and GSAP animations.
   Loaded after components.js and layout.js on every inner page.
   Body attribute decides page features:
   <body data-page="listings"> | "favorites" | "blog" | "services" | "about"
   ===================================================== */

(function () {

    // ---------- Property data (single source for listings and favorites) ----------
    const PROPERTIES = [
        { id: 1, title: "Modern Ocean Villa", location: "Miami, Florida", type: "Villa", beds: 5, baths: 4, sqft: "4,200", price: 4200, image: "Images/1.jpg", badge: "Featured", badgeClass: "featured-badge" },
        { id: 2, title: "Urban Luxury Apartment", location: "Chicago, Illinois", type: "Apartment", beds: 3, baths: 2, sqft: "2,100", price: 2850, image: "Images/2.jpg", badge: "New", badgeClass: "new-badge" },
        { id: 3, title: "Sunny Autumn House", location: "Austin, Texas", type: "House", beds: 4, baths: 3, sqft: "3,600", price: 3100, image: "Images/3.jpg", badge: "Hot Deal", badgeClass: "hot-badge" },
        { id: 4, title: "Sunset Coastal Retreat", location: "San Diego, California", type: "Villa", beds: 4, baths: 3, sqft: "3,800", price: 3900, image: "Images/Luxury%20Coastal%20Villa%20at%20Sunset.png", badge: "Featured", badgeClass: "featured-badge" },
        { id: 5, title: "Skyline Living Suite", location: "New York, New York", type: "Apartment", beds: 2, baths: 2, sqft: "1,650", price: 3400, image: "Images/0583e6a2f7bc4d0a829714ee4430fbf9.png", badge: "New", badgeClass: "new-badge" },
        { id: 6, title: "Garden Family Home", location: "Denver, Colorado", type: "House", beds: 4, baths: 3, sqft: "2,900", price: 2600, image: "Images/why%20choose%20us.jpg", badge: "Hot Deal", badgeClass: "hot-badge" }
    ];

    const FAV_KEY = "nestoria-favorites";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGsap = typeof gsap !== "undefined" && !reduceMotion;
    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

    // ---------- Favorites storage (safe if storage is blocked) ----------
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveFavorites(list) {
        try {
            localStorage.setItem(FAV_KEY, JSON.stringify(list));
        } catch (error) {
            /* storage unavailable: favorites work for this visit only */
        }
    }

    function isFavorite(id) {
        return getFavorites().includes(id);
    }

    function toggleFavorite(id) {
        const list = getFavorites();
        const next = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
        saveFavorites(next);
        return next.includes(id);
    }

    // ---------- Card template (same markup as the home page) ----------
    function formatPrice(value) {
        return "$" + value.toLocaleString("en-US");
    }

    function cardHTML(property) {
        const fav = isFavorite(property.id);
        return `
        <article class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="property-badge ${property.badgeClass}">${property.badge}</span>
                <button class="favorite-btn${fav ? " active" : ""}" aria-label="${fav ? "Remove from favorites" : "Add to favorites"}" aria-pressed="${fav}">
                    <i class="${fav ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>
            </div>
            <div class="property-content">
                <h3>${property.title}</h3>
                <div class="property-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${property.location}</span>
                </div>
                <div class="property-features">
                    <div><i class="fa-solid fa-bed"></i> <span>${property.beds} Beds</span></div>
                    <div><i class="fa-solid fa-bath"></i> <span>${property.baths} Baths</span></div>
                    <div><i class="fa-solid fa-ruler-combined"></i> <span>${property.sqft} sqft</span></div>
                </div>
                <div class="property-bottom">
                    <div class="property-price">
                        <strong>${formatPrice(property.price)}</strong> <span>/ month</span>
                    </div>
                    <a href="#" class="property-btn">View Details</a>
                </div>
            </div>
        </article>`;
    }

    // ---------- Listings page ----------
    function initListings() {
        const grid = document.getElementById("listing-grid");
        const typeSelect = document.getElementById("filter-type");
        const priceSelect = document.getElementById("filter-price");
        const count = document.getElementById("result-count");
        if (!grid || !typeSelect || !priceSelect) return;

        function matchesPrice(property, range) {
            if (range === "under-3000") return property.price < 3000;
            if (range === "3000-4000") return property.price >= 3000 && property.price <= 4000;
            if (range === "over-4000") return property.price > 4000;
            return true;
        }

        function render(animate) {
            const type = typeSelect.value;
            const range = priceSelect.value;
            const list = PROPERTIES.filter(property =>
                (type === "all" || property.type === type) && matchesPrice(property, range)
            );

            grid.innerHTML = list.length
                ? list.map(cardHTML).join("")
                : `<p class="empty-message">No properties match these filters. Try a different type or price range.</p>`;

            count.textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;

            if (animate && hasGsap) {
                gsap.from(grid.querySelectorAll(".property-card"), {
                    y: 40, opacity: 0, scale: 0.97, duration: 0.6, stagger: 0.08,
                    ease: "power3.out", clearProps: "transform,opacity"
                });
            }
        }

        typeSelect.addEventListener("change", () => render(true));
        priceSelect.addEventListener("change", () => render(true));
        render(false);
    }

    // ---------- Favorites page ----------
    function initFavorites() {
        const grid = document.getElementById("favorites-grid");
        const empty = document.getElementById("favorites-empty");
        const count = document.getElementById("result-count");
        if (!grid || !empty) return;

        function render() {
            const saved = PROPERTIES.filter(property => isFavorite(property.id));
            grid.innerHTML = saved.map(cardHTML).join("");
            grid.hidden = saved.length === 0;
            empty.hidden = saved.length !== 0;
            if (count) {
                count.textContent = `${saved.length} saved ${saved.length === 1 ? "property" : "properties"}`;
            }
        }

        render();
        window.nestoriaRefreshFavorites = render;
    }

    // ---------- Blog category filter ----------
    function initBlogFilter() {
        const chips = document.querySelectorAll("[data-filter-chip]");
        const cards = document.querySelectorAll("[data-category]");
        if (!chips.length || !cards.length) return;

        chips.forEach(chip => {
            chip.addEventListener("click", () => {
                const filter = chip.dataset.filterChip;

                chips.forEach(item => {
                    item.classList.toggle("active", item === chip);
                    item.setAttribute("aria-pressed", String(item === chip));
                });

                const visible = [];
                cards.forEach(card => {
                    const show = filter === "all" || card.dataset.category === filter;
                    card.hidden = !show;
                    if (show) visible.push(card);
                });

                if (hasGsap && visible.length) {
                    gsap.from(visible, { y: 30, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out", clearProps: "transform,opacity" });
                }
            });
        });
    }

    // ---------- FAQ accordion ----------
    function initFaq() {
        document.querySelectorAll(".faq-item").forEach(item => {
            const button = item.querySelector(".faq-q");
            const answer = item.querySelector(".faq-a");
            if (!button || !answer) return;

            // Closed answers start at 0 height
            answer.style.height = "0px";

            button.addEventListener("click", () => {
                const isOpen = item.classList.toggle("open");
                button.setAttribute("aria-expanded", String(isOpen));

                if (hasGsap) {
                    gsap.to(answer, {
                        height: isOpen ? answer.scrollHeight : 0,
                        duration: 0.45,
                        ease: "power3.out"
                    });
                } else {
                    answer.style.height = isOpen ? answer.scrollHeight + "px" : "0px";
                }
            });
        });
    }

    // ---------- Heart buttons (listings and favorites) ----------
    function bindFavoriteButtons() {
        document.addEventListener("click", event => {
            const button = event.target.closest(".favorite-btn");
            if (!button) return;

            const card = button.closest("[data-id]");
            const id = Number(card.dataset.id);
            const nowSaved = toggleFavorite(id);

            button.classList.toggle("active", nowSaved);
            button.setAttribute("aria-pressed", String(nowSaved));
            button.setAttribute("aria-label", nowSaved ? "Remove from favorites" : "Add to favorites");
            button.querySelector("i").className = `${nowSaved ? "fa-solid" : "fa-regular"} fa-heart`;

            if (hasGsap) {
                gsap.fromTo(button, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
            }

            // On the favorites page, removing a card updates the list
            if (document.body.dataset.page === "favorites" && !nowSaved && window.nestoriaRefreshFavorites) {
                if (hasGsap) {
                    gsap.to(card, { opacity: 0, y: -14, scale: 0.96, duration: 0.3, onComplete: window.nestoriaRefreshFavorites });
                } else {
                    window.nestoriaRefreshFavorites();
                }
            }
        });
    }

    // ---------- Hero headline: split words ----------
    function splitHeadline() {
        const title = document.querySelector(".page-hero h1");
        if (!title || title.children.length) return null;

        const words = title.textContent.trim().split(/\s+/);
        title.innerHTML = words
            .map(word => `<span class="split-word"><span>${word}</span></span>`)
            .join(" ");
        return title.querySelectorAll(".split-word > span");
    }

    // ---------- Count-up numbers: <strong data-count="25" data-suffix="K+">0</strong> ----------
    function initCounters() {
        if (!hasGsap || !hasScrollTrigger) return;

        document.querySelectorAll("[data-count]").forEach(el => {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || "";
            const decimals = parseInt(el.dataset.decimals || "0", 10);
            const state = { value: 0 };

            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(state, {
                        value: target,
                        duration: 1.8,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = state.value.toFixed(decimals) + suffix;
                        }
                    });
                }
            });
        });
    }

    // ---------- Hover tilt + magnetic buttons (desktop only) ----------
    function initHoverEffects() {
        if (!hasGsap || window.matchMedia("(hover: none)").matches) return;

        const tiltTargets = ".service-card, .blog-card, .plan-card, .tip-card, .quote-card, .stat-box, .value-card, .stat-item, .mission-card";
        document.querySelectorAll(tiltTargets).forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                gsap.to(card, {
                    rotationY: x * 8,
                    rotationX: -y * 8,
                    y: -6,
                    transformPerspective: 900,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.6, ease: "power3.out" });
            });
        });

        const magnetic = ".get-started-btn, .btn-primary, .btn-small, .get-started, .view-all-link";
        document.querySelectorAll(magnetic).forEach(btn => {
            btn.addEventListener("mousemove", event => {
                const rect = btn.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.25, duration: 0.3, ease: "power2.out" });
            });
            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
            });
        });
    }

    // ---------- Main GSAP animations ----------
    function initAnimations() {
        if (!hasGsap) return;

        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);

            // Scroll progress bar at the top of the page
            const bar = document.createElement("div");
            bar.className = "scroll-progress";
            document.body.appendChild(bar);
            ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: self => gsap.set(bar, { scaleX: self.progress })
            });

            // Hero background drifts as you scroll
            const hero = document.querySelector(".page-hero");
            if (hero) {
                gsap.to(hero, {
                    backgroundPositionY: "85%",
                    ease: "none",
                    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
                });
            }
        }

        // Hero entrance
        const words = splitHeadline();
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".page-hero .page-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
          .from(".page-hero .breadcrumb", { x: -20, opacity: 0, duration: 0.6 }, "<")
          .from(words || ".page-hero h1", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.06 }, "-=0.3")
          .from(".page-hero p", { y: 25, opacity: 0, duration: 0.8 }, "-=0.5");

        if (!hasScrollTrigger) return;

        // Scroll reveals: [selector of the section, selector of items inside it, stagger]
        const groups = [
            { section: ".service-grid", items: ".service-card", stagger: 0.12 },
            { section: ".steps-container", items: ".step-card", stagger: 0.15 },
            { section: ".stat-band", items: ".stat-box", stagger: 0.1 },
            { section: ".tip-grid", items: ".tip-card", stagger: 0.12 },
            { section: ".plan-grid", items: ".plan-card", stagger: 0.14 },
            { section: ".quote-grid", items: ".quote-card", stagger: 0.12 },
            { section: ".timeline", items: ".timeline-item", stagger: 0.18 },
            { section: ".faq-list", items: ".faq-item", stagger: 0.08 },
            { section: ".blog-grid", items: ".blog-card", stagger: 0.12 },
            { section: "#listing-grid", items: ".property-card", stagger: 0.1 },
            { section: ".chip-row", items: ".chip", stagger: 0.05 },
            { section: ".about-highlights", items: ".about-highlight-card", stagger: 0.12 },
            { section: ".about-purpose-grid", items: ".about-purpose-card", stagger: 0.12 },
            { section: ".about-values-grid", items: ".about-value-card", stagger: 0.12 },
            { section: ".about-journey-grid", items: ".about-journey-card", stagger: 0.14 },
            { section: ".empty-state", items: null, stagger: 0 },
            { section: ".page-section-head", items: null, stagger: 0 },
            { section: ".blog-featured", items: null, stagger: 0 },
            { section: ".story-card", items: null, stagger: 0 },
            { section: ".cta-banner", items: null, stagger: 0 },
            { section: ".band", items: null, stagger: 0 }
        ];

        groups.forEach(group => {
            document.querySelectorAll(group.section).forEach(section => {
                const targets = group.items ? section.querySelectorAll(group.items) : [section];
                if (!targets.length) return;

                gsap.from(targets, {
                    scrollTrigger: { trigger: section, start: "top 85%", once: true },
                    y: 50,
                    opacity: 0,
                    duration: 0.9,
                    stagger: group.stagger,
                    ease: "power3.out",
                    clearProps: "transform,opacity"
                });
            });
        });

        // Timeline dots pop in one by one
        gsap.from(".timeline-dot", {
            scrollTrigger: { trigger: ".timeline", start: "top 80%", once: true },
            scale: 0,
            duration: 0.5,
            stagger: 0.18,
            ease: "back.out(2)"
        });

        // Featured blog image slowly zooms out on scroll
        const featuredImg = document.querySelector(".blog-featured-img img");
        if (featuredImg) {
            gsap.fromTo(featuredImg, { scale: 1.15 }, {
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: ".blog-featured", start: "top bottom", end: "bottom top", scrub: true }
            });
        }

        // Stat numbers and plan prices count up
        initCounters();
    }

    // ---------- Start ----------
    document.addEventListener("DOMContentLoaded", () => {
        const page = document.body.dataset.page;

        bindFavoriteButtons();
        initFaq();

        if (page === "listings") initListings();
        if (page === "favorites") initFavorites();
        if (page === "blog") initBlogFilter();

        initAnimations();
        initHoverEffects();
    });

})();
