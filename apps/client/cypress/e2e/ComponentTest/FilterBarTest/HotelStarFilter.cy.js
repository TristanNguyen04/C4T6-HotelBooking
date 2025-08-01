import { navigateToHotelListing } from "../../../helper/hotelTest";
describe("Component Testing for Hotel Star Filter", () => {
    it("Test Hotel Star Filter Count", () => {
        navigateToHotelListing();
        const starMap = new Map();
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(() => {
                cy.get("[data-cy=star-rating]").then(($span) => {
                    if ($span.length > 0) {
                        cy.wrap($span).each(($span) => {
                            cy.wrap($span)
                                .invoke("text")
                                .then((starRating) => {
                                cy.log("starRating:", starRating);
                                const stars = parseInt(starRating.replace(/[()]/g, ""));
                                cy.then(() => {
                                    if (starMap.has(stars)) {
                                        starMap.set(stars, starMap.get(stars) + 1);
                                    }
                                    else {
                                        starMap.set(stars, 1);
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
        cy.then(() => {
            cy.log(JSON.stringify(Array.from(starMap.entries())));
            cy.get("[data-cy^=starsCount]").each(($label) => {
                const labelAttr = $label.attr("data-cy");
                const rating = parseInt(labelAttr.split("-")[1]);
                cy.wrap($label).within(() => {
                    cy.get(`[data-cy=hotel-count-${rating}]`)
                        .invoke("text")
                        .then((countText) => {
                        cy.log(countText);
                        const hotelCount = parseInt(countText.replace(/[()]/g, ""));
                        expect(hotelCount).to.equal(starMap.get(rating) || 0);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=HotelStarFilter.cy.js.map