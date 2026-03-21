const STATIC_UTILITIES = new Set([
    "center",
    "flex",
    "justify-center",
    "items-center"
]);

const VALUE_UTILITIES = new Set([
    "p",
    "m",
    "bg",
    "text",
    "fs",
    "border",
    "rounded"
]);

export function parseChaiClass(className) {
    if (!className || !className.startsWith("chai-")) {
        return null;
    }

    const payload = className.slice(5);
    if (!payload) {
        return null;
    }

    if (STATIC_UTILITIES.has(payload)) {
        return {
            raw: className,
            utility: payload,
            value: null
        };
    }

    const [utility, ...rest] = payload.split("-");
    if (!VALUE_UTILITIES.has(utility) || rest.length === 0) {
        return null;
    }

    const value = rest.join("-");
    if (!value) {
        return null;
    }

    return {
        raw: className,
        utility,
        value
    };
}

export function extractChaiClasses(classList) {
    return Array.from(classList).filter((name) => name.startsWith("chai-"));
}
