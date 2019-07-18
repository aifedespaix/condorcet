context("Poll", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.visit("http://localhost:8080");
    cy.login();
  });

  it("should fill poll form", () => {
    // cy.callFirestore("get", `polls/`).then(r => {
    //   cy.wrap(r[0])
    //     .its("id")
    //     .should("equal", TEST_UID);
    //   cy.wrap(r[0])
    //     .its("data.age")
    //     .should("equal", mockAge);
    // });
    // cy.get('[data-testid=form-submit]').click()
  });
});
