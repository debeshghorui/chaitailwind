import { toKebabCase } from "./utils.js";

export function applyStyles(element, styleMap) {
    if (!element || !styleMap) {
        return;
    }

    Object.entries(styleMap).forEach(([property, value]) => {
        if (value == null) {
            return;
        }

        element.style.setProperty(toKebabCase(property), String(value));
    });
}
