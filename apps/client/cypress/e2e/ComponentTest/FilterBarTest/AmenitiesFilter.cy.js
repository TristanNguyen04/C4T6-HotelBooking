import { navigateToHotelListing } from "../../../helper/hotelTest";
describe("Amenities Filter", () => {
    it("Room Facilities Count Based on Destination", () => {
        navigateToHotelListing();
        const amenityMap = new Map();
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card)
                .within(() => {
                cy.get("[data-cy=AmenityList]").each(($amenityList) => {
                    cy.wrap($amenityList).then(($list) => {
                        const hasToolTip = $list.find("span[data-tooltip-id]").length > 0;
                        if (hasToolTip) {
                            cy.wrap($list).find("span[data-tooltip-id]").each(($span) => {
                                cy.wrap($span).trigger("mouseover");
                                const toolTipId = $span.attr("data-tooltip-id");
                                cy.get(`#${toolTipId}`)
                                    .should("be.visible")
                                    .invoke("text")
                                    .then((toolTipText) => {
                                    const amenityEntry = toolTipText
                                        .split("•")
                                        .map((a) => a.trim())
                                        .filter((a) => a.length > 0);
                                    amenityEntry.forEach((a) => {
                                        if (amenityMap.has(a)) {
                                            amenityMap.set(a, amenityMap.get(a) + 1);
                                        }
                                        else {
                                            amenityMap.set(a, 1);
                                        }
                                    });
                                });
                            });
                        }
                        else {
                            cy.wrap($amenityList).within(() => {
                                cy.get("span[data-cy=preview-amenities]").each(($span) => {
                                    const entry = $span.text().trim();
                                    if (amenityMap.has(entry)) {
                                        amenityMap.set(entry, amenityMap.get(entry) + 1);
                                    }
                                    else {
                                        amenityMap.set(entry, 1);
                                    }
                                });
                            });
                        }
                    });
                });
            })
                .then(() => {
                // after iterating through all and counting, cross check with amenities filter
                cy.log(JSON.stringify(Array.from(amenityMap.entries())));
            }); // end of mapping hotel listing for verification of the filter bar
            cy.get("[data-cy=show-all-button]").click();
            cy.get('[data-cy^="amenity-"]').each(($label) => {
                cy.wrap($label).within(() => {
                    cy.get('[data-cy^="name-"]')
                        .invoke("text")
                        .then((name) => {
                        cy.get('[data-cy^="count-"]')
                            .invoke("text")
                            .then((countText) => {
                            const count = parseInt(countText.replace(/[()]/g, ""));
                            expect(amenityMap.get(name)).equal(count);
                        });
                    });
                });
            });
        });
    });
}); // end of describe
//# sourceMappingURL=AmenitiesFilter.cy.js.map