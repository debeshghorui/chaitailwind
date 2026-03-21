const COLOR_MAP = {
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    "gray-100": "#f3f4f6",
    "gray-500": "#6b7280",
    "gray-900": "#111827",
    red: "#ef4444",
    "red-500": "#ef4444",
    blue: "#3b82f6",
    "blue-500": "#3b82f6",
    green: "#22c55e",
    "green-500": "#22c55e",
    yellow: "#f59e0b"
};

const LENGTH_UNITS = ["px", "rem", "em", "%", "vh", "vw", "vmin", "vmax", "pt"];

export function isNumeric(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
}

export function normalizeLength(value) {
    if (typeof value !== "string" || value.length === 0) {
        return null;
    }

    const trimmed = value.trim().toLowerCase();

    if (isNumeric(trimmed)) {
        return `${trimmed}px`;
    }

    if (/^-?\d+(\.\d+)?pct$/.test(trimmed)) {
        return `${trimmed.replace("pct", "")}%`;
    }

    if (LENGTH_UNITS.some((unit) => trimmed.endsWith(unit))) {
        return trimmed;
    }

    return null;
}

export function resolveColor(value) {
    if (typeof value !== "string" || value.length === 0) {
        return null;
    }

    const token = value.trim().toLowerCase();

    if (COLOR_MAP[token]) {
        return COLOR_MAP[token];
    }

    if (/^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/i.test(token)) {
        return token;
    }

    if (/^hex-[0-9a-f]{3}$|^hex-[0-9a-f]{6}$/i.test(token)) {
        return `#${token.slice(4)}`;
    }

    return null;
}

export function toKebabCase(property) {
    return property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
