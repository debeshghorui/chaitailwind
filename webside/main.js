const utilityData = [
    {
        name: "Padding",
        category: "Spacing",
        sample: "chai-p-24",
        output: "padding: 24px"
    },
    {
        name: "Margin",
        category: "Spacing",
        sample: "chai-m-16",
        output: "margin: 16px"
    },
    {
        name: "Background",
        category: "Colors",
        sample: "chai-bg-blue",
        output: "background-color: #3b82f6"
    },
    {
        name: "Text Color",
        category: "Colors",
        sample: "chai-text-white",
        output: "color: #ffffff"
    },
    {
        name: "Font Size",
        category: "Typography",
        sample: "chai-fs-20",
        output: "font-size: 20px"
    },
    {
        name: "Center Text",
        category: "Typography",
        sample: "chai-center",
        output: "text-align: center"
    },
    {
        name: "Border",
        category: "Border",
        sample: "chai-border-2",
        output: "border: 2px solid #000000"
    },
    {
        name: "Rounded",
        category: "Border",
        sample: "chai-rounded-16",
        output: "border-radius: 16px"
    },
    {
        name: "Flex",
        category: "Layout",
        sample: "chai-flex",
        output: "display: flex"
    },
    {
        name: "Justify Center",
        category: "Layout",
        sample: "chai-justify-center",
        output: "justify-content: center"
    },
    {
        name: "Align Center",
        category: "Layout",
        sample: "chai-items-center",
        output: "align-items: center"
    },
    {
        name: "Border Color",
        category: "Border",
        sample: "chai-border-red",
        output: "border: 1px solid #ef4444"
    }
];

const quickChips = [
    "chai-p-24",
    "chai-p-12",
    "chai-m-12",
    "chai-bg-red",
    "chai-bg-blue",
    "chai-bg-green",
    "chai-bg-yellow",
    "chai-text-white",
    "chai-text-black",
    "chai-fs-18",
    "chai-fs-24",
    "chai-fs-32",
    "chai-border-2",
    "chai-border-red",
    "chai-rounded-8",
    "chai-rounded-24",
    "chai-center",
    "chai-flex",
    "chai-justify-center",
    "chai-items-center"
];

const presetData = [
    {
        name: "🎴 Card",
        classes: "chai-p-24 chai-bg-blue chai-text-white chai-rounded-16 chai-center"
    },
    {
        name: "🏷️ Badge",
        classes: "chai-p-12 chai-bg-red chai-text-white chai-rounded-24 chai-fs-18 chai-center"
    },
    {
        name: "📦 Bordered",
        classes: "chai-p-20 chai-border-2 chai-rounded-16 chai-center"
    },
    {
        name: "🌿 Success",
        classes: "chai-p-16 chai-bg-green chai-text-white chai-rounded-8 chai-center chai-fs-18"
    },
    {
        name: "⚠️ Warning",
        classes: "chai-p-16 chai-bg-yellow chai-text-black chai-rounded-8 chai-center chai-fs-18"
    },
    {
        name: "🏗️ Flex Layout",
        classes: "chai-flex chai-justify-center chai-items-center chai-p-24 chai-bg-blue chai-rounded-16"
    }
];

const defaultPlaygroundClasses = presetData[0].classes;

const CDN_SNIPPET = `<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.1/dist/index.browser.js"></script>
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
                `<article class="utility-card">
                    <p class="card-category">${item.category}</p>
                    <h3>${item.name}</h3>
                    <code>${item.sample}</code>
                    <span class="card-arrow">→ <span>${item.output}</span></span>
                </article>`
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
        .map((chip) => `<button class="chip" type="button" data-chip="${chip}">${chip.replace("chai-", "")}</button>`)
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
    const localBundleUrl = "../dist/index.browser.js";
    const cdnBundleUrl =
        "https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.1/dist/index.browser.js";

    const globalInit = window.initchai || window.initChai;
    if (typeof globalInit === "function") {
        return globalInit;
    }

    const urls = [localBundleUrl, cdnBundleUrl];

    for (const url of urls) {
        try {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = url;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load ${url}`));
                document.head.appendChild(script);
            });

            const loadedInit = window.initchai || window.initChai;
            if (typeof loadedInit === "function") {
                return loadedInit;
            }
        } catch (error) {
            console.warn(`Failed to load bundle from ${url}`, error);
        }
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
    const stylesOutput = document.getElementById("styles-output");
    const preview = document.getElementById("preview");
    const copyClassesBtn = document.getElementById("copy-classes-btn");
    const copyStylesBtn = document.getElementById("copy-styles-btn");

    if (!input || !button || !resetButton || !autoApply || !classCount || !activeClasses || !preview || !initChai) {
        return;
    }

    const getClassString = () => input.value.trim().replace(/\s+/g, " ");

    const updateMeta = (classes) => {
        const tokens = classes ? classes.split(" ") : [];
        classCount.textContent = String(tokens.length);
        activeClasses.textContent = classes || "-";
    };

    const updateGeneratedStyles = () => {
        if (!stylesOutput) {
            return;
        }
        const cssText = preview.style.cssText;
        if (!cssText) {
            stylesOutput.textContent = "— no styles yet —";
            return;
        }

        const formatted = cssText
            .split(";")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => `${s};`)
            .join("\n");

        stylesOutput.textContent = formatted;
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
        updateGeneratedStyles();
    };

    button.addEventListener("click", apply);
    resetButton.addEventListener("click", () => {
        input.value = defaultPlaygroundClasses;
        input.dispatchEvent(new Event("input", { bubbles: true }));
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

    // Copy buttons
    const flashCopy = (btn, original) => {
        if (!btn) return;
        const origHTML = btn.innerHTML;
        btn.innerHTML = "✓";
        btn.style.color = "#74f2cd";
        setTimeout(() => {
            btn.innerHTML = origHTML;
            btn.style.color = "";
        }, 1200);
    };

    if (copyClassesBtn) {
        copyClassesBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(getClassString());
                flashCopy(copyClassesBtn);
            } catch (e) {
                console.warn("Copy failed", e);
            }
        });
    }

    if (copyStylesBtn) {
        copyStylesBtn.addEventListener("click", async () => {
            try {
                const text = stylesOutput ? stylesOutput.textContent : "";
                await navigator.clipboard.writeText(text);
                flashCopy(copyStylesBtn);
            } catch (e) {
                console.warn("Copy failed", e);
            }
        });
    }

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
            const origHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
            window.setTimeout(() => {
                copyBtn.innerHTML = origHTML;
            }, 1400);
        } catch (error) {
            console.warn("Clipboard copy failed", error);
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
        setVersion("0.1.1");
        wirePlayground(initChai);
    } else {
        setVersion("load failed");
    }
}

initPage();
