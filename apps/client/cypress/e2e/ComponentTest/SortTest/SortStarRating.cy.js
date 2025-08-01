import { navigateToHotelListing } from "../../../helper/hotelTest";
describe('Sort By Star Rating', () => {
    beforeEach(() => {
        navigateToHotelListing();
    });
    it('Per Night: Sort Star Rating from Low To High', () => {
        let star = 0;
        cy.get('#sort-select').select("Star Rating (Low to High)");
        cy.wait(4000);
        cy.get('[data-cy=HotelListings]').each(($card) => {
            cy.wrap($card).within(() => {
                cy.get("[data-cy=star-rating]").then(($span) => {
                    if ($span.length > 0) {
                        cy.wrap($span).each(($span) => {
                            cy.wrap($span).invoke("text").then((starRating) => {
                                cy.log("starRating:", starRating);
                                const stars = parseInt(starRating.replace(/[()]/g, ""));
                                cy.then(() => {
                                    if (star <= stars) {
                                        star = stars;
                                    }
                                    else {
                                        throw new Error('Stars Not Decreasing');
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
    });
    it('Per Night: Sort Star Rating from High To Low', () => {
        let star = 5;
        cy.get('#sort-select').select("Star Rating (High to Low)");
        cy.wait(4000);
        cy.get('[data-cy=HotelListings]').each(($card) => {
            cy.wrap($card).within(() => {
                cy.get("[data-cy=star-rating]").then(($span) => {
                    if ($span.length > 0) {
                        cy.wrap($span).each(($span) => {
                            cy.wrap($span).invoke("text").then((starRating) => {
                                cy.log("starRating:", starRating);
                                const stars = parseInt(starRating.replace(/[()]/g, ""));
                                cy.then(() => {
                                    if (star >= stars) {
                                        star = stars;
                                    }
                                    else {
                                        throw new Error('Stars Not Increasing');
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
    });
    // it('Per Night: Sort Star Rating from High To Low', ()=>{});
});
//# sourceMappingURL=SortStarRating.cy.js.map