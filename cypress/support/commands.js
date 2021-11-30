// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login',(username,password)=> { 

    cy.visit("http://demo.guru99.com/test/newtours/index.php")
    cy.title().should('contains','Welcome: Mercury Tours')
    cy.url().should('contains','demo')
    cy.xpath("//input[@name='userName']").type(username).should('be.enabled')
    cy.xpath("//input[@name='password']").type(password).should('be.enabled')
    cy.xpath("//input[@name='submit']").click()
    cy.get('h3').should('contains.text','Login Successfully')
 })