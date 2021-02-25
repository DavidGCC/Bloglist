/// <reference types="Cypress" />
const baseUrl = 'http://localhost:3001';
const errorColor = '#F44336';
const successColor = '#4CAF50';


beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/test/reset`);
    cy.visit('http://localhost:3001');
});

describe('Unregistered user can not login before registering', () => {
    it('Logging in before signing up should fail', () => {
        cy.login('ATestUser', 'ATestUserPassword');
        cy.contains('Wrong Username or Password');
    });

    it('Registered user can login', () => {
        cy.get('[data-cy=loginToRegisterLink]').click();
        cy.get('[data-cy=name]').type('ATestUserName');
        cy.get('[data-cy=username]').type('ATestUser');
        cy.get('[data-cy=password]').type('ATestUserPassword');
        cy.get('[data-cy=confirmPassword]').type('ATestUserPassword');
        cy.get('[data-cy=registerButton]').click();

        cy.contains('ATestUserName Successfully Joined Listablog');
        
        cy.login('ATestUser', 'ATestUserPassword');
        cy.contains('ATestUserName Successfully Logged In');
    });
    
});