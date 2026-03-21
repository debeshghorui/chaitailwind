import { normalizeLength, resolveColor } from "./utils.js";

export function mapUtilityToStyle(parsed) {
    if (!parsed) {
        return null;
    }

    const { utility, value } = parsed;

    switch (utility) {
        case "p": {
            const normalized = normalizeLength(value);
            return normalized ? { padding: normalized } : null;
        }
        case "m": {
            const normalized = normalizeLength(value);
            return normalized ? { margin: normalized } : null;
        }
        case "fs": {
            const normalized = normalizeLength(value);
            return normalized ? { fontSize: normalized } : null;
        }
        case "rounded": {
            const normalized = normalizeLength(value);
            return normalized ? { borderRadius: normalized } : null;
        }
        case "bg": {
            const color = resolveColor(value);
            return color ? { backgroundColor: color } : null;
        }
        case "text": {
            const color = resolveColor(value);
            return color ? { color } : null;
        }
        case "border": {
            const borderWidth = normalizeLength(value);
            if (borderWidth) {
                return { border: `${borderWidth} solid #000000` };
            }

            const borderColor = resolveColor(value);
            if (borderColor) {
                return { border: `1px solid ${borderColor}` };
            }

            return null;
        }
        case "center":
            return { textAlign: "center" };
        case "flex":
            return { display: "flex" };
        case "justify-center":
            return { justifyContent: "center" };
        case "items-center":
            return { alignItems: "center" };
        default:
            return null;
    }
}
