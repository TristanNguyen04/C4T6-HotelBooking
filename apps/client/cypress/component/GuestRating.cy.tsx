import GuestRatingFilter from "../../src/components/filters/GuestRatingFilter";
import { mount } from "cypress/react";
import { mockHotels } from "../helper/hotelTest";

describe("Guest Rating Filter", () => {
  let setSelectedGuestRatings: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    setSelectedGuestRatings = cy.stub().as("setSelectedGuestRatings");
    const defaultProps = {
      hotels: mockHotels,
      selectedGuestRatings: [],
      setSelectedGuestRatings: setSelectedGuestRatings,
    };
    mount(<GuestRatingFilter {...defaultProps} />);
  });
  it("renders all 4 guest rating options", () => {
    cy.contains("Outstanding").should("exist");
    cy.contains("Excellent").should("exist");
    cy.contains("Very Good").should("exist");
    cy.contains("Good").should("exist");
    cy.contains("Outstanding(1)").should("exist");
    cy.contains("Excellent(1)").should("exist");
    cy.contains("Very Good(1)").should("exist");
    cy.contains("Good(0)").should("exist");
  });
});
