describe('constructor.cy.tsx', () => {
  it('constructor', () => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients.json'
    }).as('getIngredients')

    cy.visit('/')

    cy.wait('@getIngredients')
    
    cy.get('#burger_ingredients')
      .first()
      .within(() => {
        cy.contains('Добавить').click()
      })

    cy.get('#burger_constructor')
      .within(() => {
        cy.contains('Краторная булка N-200i').should('exist')
      })
  })
})
    // cy.intercept('POST', '/api/auth/user', {
    //   statusCode: 200,
    //   body: {
    //     success: true,
    //     accessToken: 'mock-access-token',
    //     refreshToken: 'mock-refresh-token',
    //     user: {
    //       email: 'test@test.com',
    //       name: 'Test User'
    //     }
    //   }
    // }).as('getUser')