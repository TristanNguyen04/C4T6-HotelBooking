import { navigateToHotelListing } from "../../../helper/hotelTest";
describe("Component Testing for Price Range Filter", () => {
    it("Test Price Range Count", () => {
        navigateToHotelListing();
        let min = Infinity;
        let max = Number.NEGATIVE_INFINITY;
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(() => {
                cy.get("[data-cy=hotel-price]").each(($price) => {
                    cy.wrap($price)
                        .invoke("text")
                        .then((price) => {
                        const p = parseFloat(price.replace(/[^0-9.]/g, ""));
                        cy.log(p.toString());
                        if (p > max) {
                            max = Math.ceil(p);
                        }
                        if (p < min) {
                            min = Math.floor(p);
                        }
                    });
                });
            });
        });
        cy.then(() => {
            cy.get("[data-cy=price-slider-info]").within(() => {
                cy.get("[data-cy=minPrice]")
                    .invoke("text")
                    .then((minPrice) => {
                    cy.log("min", minPrice);
                    const matches = minPrice.match(/\d+/g); // Match all numbers
                    const minVal = matches ? parseInt(matches[0]) : null;
                    expect(minVal).to.equal(min);
                });
                cy.get("[data-cy=maxPrice]")
                    .invoke("text")
                    .then((maxPrice) => {
                    cy.log("max", maxPrice);
                    const matches = maxPrice.match(/\d+/g);
                    const maxVal = matches
                        ? parseInt(matches[matches.length - 1])
                        : null;
                    expect(maxVal).to.equal(max);
                });
            });
        });
    });
});
//# sourceMappingURL=PriceRangeFilter.cy.js.map