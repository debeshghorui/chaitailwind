import { describe, expect, it } from "vitest";
import { mapUtilityToStyle } from "../src/mapper.js";

describe("mapper", () => {
    it("maps spacing utility", () => {
        const style = mapUtilityToStyle({ utility: "p", value: "10" });
        expect(style).toEqual({ padding: "10px" });
    });

    it("maps color utility", () => {
        const style = mapUtilityToStyle({ utility: "bg", value: "red" });
        expect(style).toEqual({ backgroundColor: "#ef4444" });
    });

    it("maps layout utility", () => {
        const style = mapUtilityToStyle({ utility: "justify-center", value: null });
        expect(style).toEqual({ justifyContent: "center" });
    });

    it("returns null for unsupported value", () => {
        const style = mapUtilityToStyle({ utility: "rounded", value: "banana" });
        expect(style).toBeNull();
    });
});
