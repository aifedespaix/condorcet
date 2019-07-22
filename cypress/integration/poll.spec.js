context("Poll", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.visit("http://localhost:8080");
    cy.login();
  });

  it("should create poll", () => {
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

    cy.get('[data-testid=form-submit]').click()

  });
  
  it('should go to the vote screen', () => {
    cy.get("[data-testid=burger-button]").click();
  
    cy.get("[data-testid=navlink-user-polls]").click();
  
    cy.get('[data-testid="voter-Quel-est-le-chef-d\'etat-le-plus-street-cred"]').click()

    cy.get('[data-testid=vote]').click()
  })

  it.only('should go to the result screen', () => {
    cy.get("[data-testid=burger-button]").click();
  
    cy.get("[data-testid=navlink-user-polls]").click();

    cy.get('[data-testid="close-Quel-est-le-chef-d\'etat-le-plus-street-cred"]').click()

    cy.wait(2000)
    
    cy.get('[data-testid="results-Quel-est-le-chef-d\'etat-le-plus-street-cred"]').click()
  
    
  })
});
