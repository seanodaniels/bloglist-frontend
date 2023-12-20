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

  describe('Login', function() {
    beforeEach(function() {
      const user = {
        name: 'Sean ODaniels',
        username: 'sean',
        password: 'secret',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, user)
      cy.visit('')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('.login-username').type('sean')
      cy.get('.login-password').type('secret')
      cy.get('.login-submit').click()

      cy.get('.notification').should('contain', 'sean logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('.login-username').type('sean')
      cy.get('.login-password').type('badpassword')
      cy.get('.login-submit').click()

      cy.get('.error-message').should('contain', 'wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'Sean ODaniels',
        username: 'sean',
        password: 'secret',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, user)
      cy.visit('')
      cy.contains('login').click()
      cy.get('.login-username').type('sean')
      cy.get('.login-password').type('secret')
      cy.get('.login-submit').click()
    })

    it('A blog can be created', function() {
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('cypress title')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs').should('contain', 'cypress title')
    })

    it('A blog can be liked', function() {
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('cypress title')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('cypress title')
        .parent().as('theContainerDiv')
      cy.get('@theContainerDiv').find('.button-view').click()
      cy.get('@theContainerDiv').find('.button-like').click()

      cy.get('.notification').should('contain', 'liked')
    })

    it.only('Blogs are listed in descending order of likes', function() {

      // Post - the second most likes
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('The title with the second most likes')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('The title with the second most likes')
        .parent().as('container1')
      cy.get('@container1').find('.button-view').click()

      cy.get('@container1').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container1').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container1').find('.button-like').click()
      cy.wait(3000)

      // Post - the least number of likes
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('The title with the least likes')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('The title with the least likes')
        .parent().as('container2')
      cy.get('@container2').find('.button-view').click()

      cy.get('@container2').find('.button-like').click()
      cy.wait(3000)

      // Post - the most likes
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('The title with the most likes')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('The title with the most likes')
        .parent().as('container3')
      cy.get('@container3').find('.button-view').click()

      cy.get('@container3').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container3').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container3').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container3').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container3').find('.button-like').click()
      cy.wait(3000)

      // Post - the third most likes
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('The title with the third most likes')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('The title with the third most likes')
        .parent().as('container4')
      cy.get('@container4').find('.button-view').click()

      cy.get('@container4').find('.button-like').click()
      cy.wait(3000)
      cy.get('@container4').find('.button-like').click()

      // Now test the order
      cy.wait(1000)
      cy.get('.listing').eq(0).should('contain', 'The title with the most likes')
      cy.get('.listing').eq(1).should('contain', 'The title with the second most likes')
      cy.get('.listing').eq(2).should('contain', 'The title with the third most likes')
      cy.get('.listing').eq(3).should('contain', 'The title with the least likes')
    })

    it('A user can delete a post of theirs', function() {
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('cypress title')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()

      cy.get('#list-of-blogs')
        .contains('cypress title')
        .parent().as('theContainerDiv')
      cy.get('@theContainerDiv').find('.button-view').click()
      cy.get('@theContainerDiv').find('.button-delete').click()

      cy.get('.notification').should('contain', 'Blog deleted')
    })

    it('A user can only see delete button for posts they authored', function() {
      // Create a new blog post as current user, then logout
      cy.contains('add new blog listing').click()
      cy.get('.new-title').type('cypress title')
      cy.get('.new-author').type('cypress author')
      cy.get('.new-url').type('cypress url')
      cy.get('.submit-new-blog').click()
      cy.get('.login-logout').click()

      // Add a second user
      const user2 = {
        name: 'Second User',
        username: 'seconduser',
        password: 'secretpassword',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, user2)

      // Login as second user
      cy.contains('login').click()
      cy.get('.login-username').type('seconduser')
      cy.get('.login-password').type('secretpassword')
      cy.get('.login-submit').click()

      // Attempt to delete blog post and fail
      cy.get('#list-of-blogs')
        .contains('cypress title')
        .parent().as('theContainerDiv')
      cy.get('@theContainerDiv').find('.button-view').click()
      cy.get('@theContainerDiv').should('not.contain', '.button-delete')
    })
  })
})