const utilityData = [
    { name: "Spacing", sample: "chai-p-12 chai-m-16" },
    { name: "Background", sample: "chai-bg-blue" },
    { name: "Text Color", sample: "chai-text-white" },
    { name: "Font Size", sample: "chai-fs-20" },
    { name: "Center Text", sample: "chai-center" },
    { name: "Border", sample: "chai-border-2" },
    { name: "Rounded", sample: "chai-rounded-16" },
    { name: "Layout", sample: "chai-flex chai-justify-center chai-items-center" }
];

const quickChips = [
    "chai-p-24",
    "chai-m-12",
    "chai-bg-red",
    "chai-bg-blue",
    "chai-text-white",
    "chai-fs-24",
    "chai-border-2",
    "chai-rounded-24",
    "chai-center"
];

const presetData = [
    {
        name: "Card",
        classes: "chai-p-24 chai-bg-blue chai-text-white chai-rounded-16 chai-center"
    },
    {
        name: "Badge",
        classes: "chai-p-12 chai-bg-red chai-text-white chai-rounded-24 chai-fs-20 chai-center"
    },
    {
        name: "Clean",
        classes: "chai-p-20 chai-border-2 chai-rounded-16 chai-center"
    }
];

const defaultPlaygroundClasses = presetData[0].classes;

const CDN_SNIPPET = `<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.0/dist/index.browser.js"></script>
<script>
    window.initchai();
</script>`;

function renderUtilityGrid() {
    const grid = document.getElementById("utility-grid");
    if (!grid) {
        return;
    }

    const cards = utilityData
        .map(
            (item) =>
                `<article class="utility-card"><p>${item.name}</p><h3>${item.sample.split(" ")[0]}</h3><code>${item.sample}</code></article>`
        )
        .join("");

    grid.innerHTML = cards;
}

function renderChips() {
    const row = document.getElementById("chip-row");
    const input = document.getElementById("class-input");
    if (!row || !input) {
        return;
    }

    row.innerHTML = quickChips
        .map((chip) => `<button class="chip" type="button" data-chip="${chip}">${chip}</button>`)
        .join("");

    const getTokens = () =>
        input.value
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    const syncActiveChips = () => {
        const tokenSet = new Set(getTokens());
        row.querySelectorAll(".chip").forEach((node) => {
            if (!(node instanceof HTMLElement)) {
                return;
            }
            const chip = node.dataset.chip;
            if (!chip) {
                return;
            }
            node.classList.toggle("is-active", tokenSet.has(chip));
        });
    };

    row.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const chip = target.getAttribute("data-chip");
        if (!chip) {
            return;
        }

        const tokens = getTokens();
        const hasChip = tokens.includes(chip);
        const nextTokens = hasChip ? tokens.filter((token) => token !== chip) : [...tokens, chip];

        input.value = nextTokens.join(" ");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        syncActiveChips();
    });

    input.addEventListener("input", syncActiveChips);
    syncActiveChips();
}

function renderPresets() {
    const row = document.getElementById("preset-row");
    const input = document.getElementById("class-input");
    if (!row || !input) {
        return;
    }

    row.innerHTML = presetData
        .map(
            (preset) =>
                `<button class="preset-btn" type="button" data-preset="${preset.name}">${preset.name}</button>`
        )
        .join("");

    row.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        const presetName = target.getAttribute("data-preset");
        if (!presetName) {
            return;
        }

        const found = presetData.find((item) => item.name === presetName);
        if (!found) {
            return;
        }

        input.value = found.classes;
        input.dispatchEvent(new Event("input", { bubbles: true }));
    });
}

async function loadInitChai() {
    const browserBundleUrl =
        "https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.0/dist/index.browser.js";

    const globalInit = window.initchai || window.initChai;
    if (typeof globalInit === "function") {
        return globalInit;
    }

    try {
        await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = browserBundleUrl;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${browserBundleUrl}`));
            document.head.appendChild(script);
        });

        const loadedInit = window.initchai || window.initChai;
        if (typeof loadedInit === "function") {
            return loadedInit;
        }
    } catch (error) {
        console.warn("Failed to load browser bundle", error);
    }

    return null;
}

function setVersion(versionText) {
    const node = document.getElementById("pkg-version");
    if (node) {
        node.textContent = versionText;
    }
}

function setFooterYear() {
    const node = document.getElementById("footer-year");
    if (!node) {
        return;
    }
    node.textContent = String(new Date().getFullYear());
}

function wireNavbar() {
    const topbar = document.getElementById("site-topbar");
    const nav = document.getElementById("primary-nav");
    const toggle = document.getElementById("nav-toggle");
    const links = Array.from(document.querySelectorAll(".nav-link"));

    if (!topbar || !nav || !toggle || links.length === 0) {
        return;
    }

    const setActive = (id) => {
        links.forEach((link) => {
            const targetId = link.getAttribute("href")?.slice(1);
            link.classList.toggle("is-active", targetId === id);
        });
    };

    const closeMenu = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    const sectionTargets = links
        .map((link) => link.getAttribute("href")?.slice(1))
        .filter(Boolean)
        .map((id) => document.getElementById(id))
        .filter((node) => node instanceof HTMLElement);

    if (sectionTargets.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0.01
            }
        );

        sectionTargets.forEach((section) => observer.observe(section));
    }

    const startId = window.location.hash ? window.location.hash.slice(1) : "home";
    setActive(startId);

    const syncScrolledState = () => {
        topbar.classList.toggle("is-scrolled", window.scrollY > 6);
    };

    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });
}

function wirePlayground(initChai) {
    const input = document.getElementById("class-input");
    const button = document.getElementById("apply-btn");
    const resetButton = document.getElementById("reset-btn");
    const autoApply = document.getElementById("auto-apply");
    const classCount = document.getElementById("class-count");
    const activeClasses = document.getElementById("active-classes");
    const preview = document.getElementById("preview");

    if (!input || !button || !resetButton || !autoApply || !classCount || !activeClasses || !preview || !initChai) {
        return;
    }

    const getClassString = () => input.value.trim().replace(/\s+/g, " ");

    const updateMeta = (classes) => {
        const tokens = classes ? classes.split(" ") : [];
        classCount.textContent = String(tokens.length);
        activeClasses.textContent = classes || "-";
    };

    const apply = () => {
        preview.className = "preview-box";
        preview.removeAttribute("style");
        const classes = getClassString();
        if (classes) {
            preview.className = `preview-box ${classes}`;
        }
        updateMeta(classes);
        initChai();
    };

    button.addEventListener("click", apply);
    resetButton.addEventListener("click", () => {
        input.value = defaultPlaygroundClasses;
        apply();
    });

    input.addEventListener("input", () => {
        const classes = getClassString();
        updateMeta(classes);
        if (autoApply instanceof HTMLInputElement && autoApply.checked) {
            apply();
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            apply();
        }
    });

    apply();
}

function wireSnippetCopy() {
    const code = document.getElementById("cdn-code");
    const copyBtn = document.getElementById("copy-cdn-btn");
    if (!code || !copyBtn) {
        return;
    }

    code.textContent = CDN_SNIPPET;

    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(CDN_SNIPPET);
            copyBtn.textContent = "Copied";
            window.setTimeout(() => {
                copyBtn.textContent = "Copy Script";
            }, 1400);
        } catch (error) {
            console.warn("Clipboard copy failed", error);
            copyBtn.textContent = "Copy failed";
            window.setTimeout(() => {
                copyBtn.textContent = "Copy Script";
            }, 1600);
        }
    });
}

async function initPage() {
    setFooterYear();
    wireNavbar();
    renderUtilityGrid();
    renderChips();
    renderPresets();
    wireSnippetCopy();

    const initChai = await loadInitChai();
    if (initChai) {
        wirePlayground(initChai);
    } else {
        setVersion("load failed");
    }
}

initPage();
