/// <reference types="cypress" />;

it("Url Test", () => {
  cy.visit("http://localhost:3000/");
  cy.get(":nth-child(1) > .form-control").type("mirza@gmail.com");
  cy.get(":nth-child(2) > .form-control").type("12345{Enter}");
  cy.contains("2. EMPLOYEMENT DETAILS").click();

  cy.get(".pt-1 > .d-grid > .btn")
    .should("contain", "Save / Update")
    .should("have.class", "btn btn-success");
});
