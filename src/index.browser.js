import { initChai, stopChaiObserver } from "./index.js";

const globalTarget =
    typeof window !== "undefined"
        ? window
        : typeof globalThis !== "undefined"
            ? globalThis
            : null;

if (globalTarget) {
    globalTarget.initChai = initChai;
    globalTarget.initchai = initChai;
    globalTarget.stopChaiObserver = stopChaiObserver;
    globalTarget.stopchaiobserver = stopChaiObserver;
}
