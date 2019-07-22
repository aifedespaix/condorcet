context("Poll", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.visit("http://localhost:8080");
    cy.login();
  });

  it("should fill poll form", () => {
    cy.get("[data-testid=burger-button]").click();

    cy.get("[data-testid=navlink-poll-creation]").click();

    cy.get("[data-testid=form-question]").type(
      "Quel est le chef d'état le plus street cred ?"
    );

    cy.get("[data-testid=form-description]").type(
      "Peut être que j'aurais des problèmes avec ce test mais au moins il est marrant"
    );

    [
      "Sadam Hussein",
      "Macron",
      "Jean Smaug",
      "Pinochet",
      "Poutine",
      "Justin Trudeau"
    ].forEach(item => {
      cy.get("[data-testid=form-answer]").type(item);

      cy.get("[data-testid=form-addAnswer]").click();
    });

    cy.get("[data-testid=form-answerProposal-jean-smaug]").click();

    cy.scrollTo("bottom");

    // cy.get('[data-testid=form-submit]').click()

  });
  
  it('should go to the vote screen', () => {
    cy.get("[data-testid=burger-button]").click();
  
    cy.get("[data-testid=navlink-user-polls]").click();
  
    
  })
});
