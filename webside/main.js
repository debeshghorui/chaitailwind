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

    row.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const chip = target.getAttribute("data-chip");
        if (!chip) {
            return;
        }

        const existing = input.value.trim();
        if (existing.includes(chip)) {
            return;
        }

        input.value = `${existing} ${chip}`.trim();
    });
}

async function loadInitChai() {
    const moduleUrls = [
        "https://esm.sh/@debeshghorui/chaitailwind@0.1.0?bundle",
        "https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.0/dist/index.js/+esm"
    ];

    for (const url of moduleUrls) {
        try {
            const mod = await import(url);
            if (typeof mod.initChai === "function") {
                return mod.initChai;
            }
        } catch (error) {
            console.warn(`Failed to load ${url}`, error);
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

function wirePlayground(initChai) {
    const input = document.getElementById("class-input");
    const button = document.getElementById("apply-btn");
    const preview = document.getElementById("preview");

    if (!input || !button || !preview || !initChai) {
        return;
    }

    const apply = () => {
        preview.className = "preview-box";
        const classes = input.value.trim().replace(/\s+/g, " ");
        if (classes) {
            preview.className = `preview-box ${classes}`;
        }
        initChai();
    };

    button.addEventListener("click", apply);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            apply();
        }
    });

    apply();
}

async function initPage() {
    renderUtilityGrid();
    renderChips();

    const initChai = await loadInitChai();
    if (initChai) {
        wirePlayground(initChai);
    } else {
        setVersion("load failed");
    }
}

initPage();
