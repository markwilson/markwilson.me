describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Successfully loads", () => {
    // no-op
  });

  it("Shows my name", () => {
    cy.contains("Mark Wilson").should("be.visible");
  });

  it("Shows my job title", () => {
    cy.contains("Engineering Manager").should("be.visible");
  });

  it("Show my previous jobs", () => {
    cy.get("button").should("be.visible").click();

    cy.contains("Engineering Lead").should("be.visible");
    cy.contains("Onfido").should("be.visible");
    cy.contains("Engineering Team Lead").should("be.visible");
    cy.contains("Paddle").should("be.visible");
    cy.contains("Technical Team Lead").should("be.visible");
    cy.contains("Rippleffect").should("be.visible");
  });

  it("Has a link to LinkedIn", () => {
    cy.get("a")
      .should("be.visible")
      .should("have.attr", "href")
      .and("include", "https://www.linkedin.com/");
  });

  it("Loads my face", () => {
    cy.get("img")
      .should("have.attr", "alt", "Mark Wilson's portrait")
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
