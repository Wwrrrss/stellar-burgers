import { contains } from "cypress/types/jquery"

describe('constructor-page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients.json'
    }).as('getIngredients')

    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: {
          email: 'test@test.com',
          name: 'Test User'
        }
      }
    }).as('getUser')

    cy.visit('/')

    cy.wait('@getIngredients')
    cy.wait('@getUser')
  })

  it('ingredient in constructor', () => {
    
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

  it('modal window', () => {
    cy.get('#burger_ingredients')
      .first()
      .within(() => {
        cy.contains('Краторная булка N-200i').click()
      })
    cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c')

    cy.get('#modal')
      .within(() => {
        cy.get('button').click()
      })
    cy.get('#modal').should('not.exist')
  })

  it('order', () => {
    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      fixture: 'order.json'
    }).as('orderBurger')

    cy.get('#burger_ingredients')
      .find('li')
      .each(($el, index) => {
        if (index < 3) {
          cy.wrap($el).contains('Добавить').click()
        }
      })
    
    cy.get('#burger_constructor')
      .within(() => {
        cy.contains('Оформить заказ').click()
      })

    cy.wait('@orderBurger')
    
    cy.get('#modal').should('exist')
    cy.get('#modal').should('contain', '103709')

    cy.get('#modal')
      .within(() => {
        cy.get('button').click()
      })
    
    cy.get('#modal').should('not.exist')

    cy.get('#burger_constructor').should('contain', 'Выберите булки')
    cy.get('#burger_constructor').should('contain', 'Выберите начинку')
  })
})