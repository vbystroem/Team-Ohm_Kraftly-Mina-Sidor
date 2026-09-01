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
    cy.get('input[placeholder="Lösenord"]').type('hemligt123')
    cy.contains('button', 'Logga in').click()

    // back on the dashboard
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.contains('h1', 'Hej').should('be.visible')
    // the topbar (only rendered when logged in) shows the logout action
    cy.contains('Logga ut').should('be.visible')
    // the auth flag is persisted so the guard won't bounce us out again
    cy.window().then((win) => {
      expect(win.localStorage.getItem('kraftly_logged_in')).to.eq('true')
    })
  })

  it('keeps the session across a reload', () => {
    cy.url().should('include', '/login')
    cy.get('input[placeholder="E-postadress"]').type(
      'anna.andersson@example.com',
    )
    cy.get('input[placeholder="Lösenord"]').type('hemligt123')
    cy.contains('button', 'Logga in').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')

    // reload: guard sees kraftly_logged_in still set, so we stay on the dashboard
    cy.reload()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.contains('h1', 'Hej').should('be.visible')
    cy.contains('Logga ut').should('be.visible')
  })
})
