import { describe, expect, it } from "vitest";
import { extractChaiClasses, parseChaiClass } from "../src/parser.js";

describe("parser", () => {
    it("parses static utility", () => {
        expect(parseChaiClass("chai-flex")).toEqual({
            raw: "chai-flex",
            utility: "flex",
            value: null
        });
    });

    it("parses value utility", () => {
        expect(parseChaiClass("chai-p-10")).toEqual({
            raw: "chai-p-10",
            utility: "p",
            value: "10"
        });
    });

    it("returns null for invalid utility", () => {
        expect(parseChaiClass("chai-unknown-10")).toBeNull();
    });

    it("extracts only chai classes", () => {
        const classList = new Set(["chai-p-10", "btn", "chai-text-red"]);
        expect(extractChaiClasses(classList)).toEqual(["chai-p-10", "chai-text-red"]);
    });
});
