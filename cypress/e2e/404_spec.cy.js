describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/404.html");
  });

  it("Successfully loads", () => {
    // no-op
  });

  it("Contains link to home page", () => {
    cy.get("a").should("have.attr", "href", "/");
  });

  it("Redirects to home page", () => {
    cy.wait(5000);
    cy.location("pathname").should("eq", "/");
  });
});
