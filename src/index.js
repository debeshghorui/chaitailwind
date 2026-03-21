import { scanDOM, scanElement } from "./scanner.js";

let observer = null;

export function initChai(options = {}) {
    const { root = document, observe = false } = options;

    scanDOM(root);

    if (observe && root && root.body) {
        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type !== "childList") {
                    return;
                }

                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof Element)) {
                        return;
                    }

                    scanElement(node);
                    if (node.querySelectorAll) {
                        scanDOM(node);
                    }
                });
            });
        });

        observer.observe(root.body, {
            childList: true,
            subtree: true
        });
    }
}

export function stopChaiObserver() {
    if (!observer) {
        return;
    }

    observer.disconnect();
    observer = null;
}
