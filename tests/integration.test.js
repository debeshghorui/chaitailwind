import { describe, expect, it } from "vitest";
import { scanDOM } from "../src/scanner.js";

describe("integration", () => {
    it("applies multiple utilities to an element and removes chai-* classes", () => {
        document.body.innerHTML = `
      <div id="card" class="chai-p-16 chai-bg-blue chai-text-white chai-rounded-8 chai-center">
        Card
      </div>
    `;

        scanDOM(document);

        const card = document.getElementById("card");
        expect(card.style.padding).toBe("16px");
        expect(card.style.backgroundColor).toBe("rgb(59, 130, 246)");
        expect(card.style.color).toBe("rgb(255, 255, 255)");
        expect(card.style.borderRadius).toBe("8px");
        expect(card.style.textAlign).toBe("center");

        // Verify chai-* classes were removed
        const remainingChaiClasses = Array.from(card.classList).filter(c => c.startsWith("chai-"));
        expect(remainingChaiClasses).toEqual([]);
    });

    it("ignores invalid classes", () => {
        document.body.innerHTML = `<p id="msg" class="chai-unknown-100">Hello</p>`;
        scanDOM(document);

        const msg = document.getElementById("msg");
        expect(msg.style.cssText).toBe("");
    });
});
