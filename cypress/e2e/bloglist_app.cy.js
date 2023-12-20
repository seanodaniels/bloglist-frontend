Cypress.Commands.add('createBloglist', ({ content, important }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })

  cy.visit('')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit('')
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('.toggle-label')
      .should('contain', 'login')
  })
})