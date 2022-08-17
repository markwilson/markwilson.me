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

  it("Has a link to LinkedIn", () => {
    cy.get("a")
      .should("be.visible")
      .should("have.attr", "href")
      .and("include", "https://www.linkedin.com/");
  });

  it("Loads my face", () => {
    cy.get("img")
      .should("have.attr", "alt", "Mark Wilson's headshot")
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
