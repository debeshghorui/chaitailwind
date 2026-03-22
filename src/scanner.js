import { applyStyles } from "./applyStyles.js";
import { mapUtilityToStyle } from "./mapper.js";
import { extractChaiClasses, parseChaiClass } from "./parser.js";

function applyClassStyles(element) {
    const chaiClasses = extractChaiClasses(element.classList);
    const appliedClasses = [];

    chaiClasses.forEach((className) => {
        const parsed = parseChaiClass(className);
        if (!parsed) {
            return;
        }

        const styleMap = mapUtilityToStyle(parsed);
        if (!styleMap) {
            return;
        }

        applyStyles(element, styleMap);
        appliedClasses.push(className);
    });

    appliedClasses.forEach((cls) => element.classList.remove(cls));
}

export function scanDOM(root = document) {
    if (!root || !root.querySelectorAll) {
        return;
    }

    const nodes = root.querySelectorAll("[class]");
    nodes.forEach((node) => applyClassStyles(node));
}

export function scanElement(element) {
    if (!element || !element.classList) {
        return;
    }

    applyClassStyles(element);
}
