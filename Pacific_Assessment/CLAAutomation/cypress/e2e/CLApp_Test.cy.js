
const serverUrl = 'http://127.0.0.1:8081';
const filePath = serverUrl+'/index.html';

describe('Verify page title and header', () => {
    it('should have the correct page title', () => {
        cy.visit(filePath);
        cy.title().should('eq', 'Sample Page');
    });

    it('should display the correct header', () => {
        cy.visit(filePath);
        cy.get('h1').should('be.visible').and('have.text', 'Welcome to the Sample Page');
    });

    it('should have a login button with the text "Login"', () => {
        cy.visit(filePath);
        cy.get('#login-btn').should('be.visible').and('have.text', 'Login');
    });

    it('should keep the hidden section hidden after invalid login attempt', () => {
        cy.visit(filePath);
        cy.get('#username').should('be.visible').type('invalidUser');
        cy.get('#password').should('be.visible').type('invalidPass');
        cy.get('#login-btn').should('be.visible').click();
        cy.get('#hidden-section').should('have.class', 'hidden');
    });

    it('should reveal the hidden section after valid login attempt', () => {
        cy.visit(filePath); // Replace with your actual file path or URL
        cy.get('#username').should('be.visible').clear().type('user');
        cy.get('#password').should('be.visible').clear().type('pass');
        cy.get('#login-btn').should('be.visible').click();
        cy.get('#hidden-section').should('not.have.class', 'hidden');
    });

    it('should have the correct class and styling for the login button', () => {
        cy.visit(filePath);
        cy.get('#login-btn')
            .should('be.visible')
            .and('have.class', 'btn')
            .and('have.css', 'background-color', 'rgb(76, 175, 80)')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
            .and('have.css', 'padding', '10px 20px')
            .and('have.css', 'border', '0px none rgb(255, 255, 255)')
            .and('have.css', 'cursor', 'pointer');
    });

    it('should have the correct headers and data in the information section', () => {
        cy.visit(filePath);

        cy.get('.header-section p').should('have.length', 3);
        cy.get('.header-section p').eq(0).should('have.text', 'Country');
        cy.get('.header-section p').eq(1).should('have.text', 'Province');
        cy.get('.header-section p').eq(2).should('have.text', 'Date');

        cy.get('.data-section p').should('have.length', 3);
        cy.get('.data-section p').eq(0).should('have.text', 'Canada');
        cy.get('.data-section p').eq(1).should('have.text', 'British Columbia');
        cy.get('.data-section p').eq(2).should('be.visible').invoke('text').then((text) => {
            const currentDate = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);
            expect(text).to.equal(formattedDate);
        });
    });
});
