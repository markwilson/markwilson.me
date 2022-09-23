describe("404 page", () => {
  beforeEach(() => {
    cy.visit("/404.html");
  });

  it("Successfully loads", () => {
    // no-op
  });

  it("Contains link to home page", () => {
    cy.get("a").should("have.attr", "href", "/");
  });
});
