// E2E: full login flow against the real app + mock API.
// Run with: npm run e2e
describe('Login flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    // visiting "/" while logged out triggers the router guard's redirect
    cy.visit('/')
  })

  it('redirects unauthenticated users to the login page', () => {
    cy.url().should('include', '/login')
    cy.contains('h1', 'Logga in på Mina sidor').should('be.visible')
  })

  it('logs in and reaches the dashboard', () => {
    cy.url().should('include', '/login')

    cy.get('input[placeholder="E-postadress"]').type(
      'anna.andersson@example.com',
    )
    cy.get('input[placeholder="Lösenord"]').type('kraftly-anna')
    cy.contains('button', 'Logga in').click()

    // back on the dashboard
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.contains('h1', 'Hej').should('be.visible')
    // the topbar (only rendered when logged in) shows the logout action
    cy.contains('Logga ut').should('be.visible')
    cy.window().then((win) => {
      expect(win.localStorage.length).to.eq(0)
    })
  })

  it('keeps the session across a reload', () => {
    cy.url().should('include', '/login')
    cy.get('input[placeholder="E-postadress"]').type(
      'anna.andersson@example.com',
    )
    cy.get('input[placeholder="Lösenord"]').type('kraftly-anna')
    cy.contains('button', 'Logga in').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')

    // reload: the refresh cookie keeps the session alive
    cy.reload()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.contains('h1', 'Hej').should('be.visible')
    cy.contains('Logga ut').should('be.visible')
  })
})
