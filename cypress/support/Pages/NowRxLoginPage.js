///<reference types = 'cypress'/>
const locator = require('../../fixtures/locators.json');

class NowRxLoginPage{
    typeUserId(userIdValue){
        cy.get(locator.logionPageLocator.userId).should('be.enabled').type(userIdValue);
    }

    typePassword(passwordValue){
        cy.get(locator.logionPageLocator.password).should('be.enabled').type(passwordValue);
    }

    loginButton(){
        return cy.get(locator.logionPageLocator.loginButton);
    }

    clickLoginButton(){
        cy.get(locator.logionPageLocator.loginButton).should('be.enabled').click();
    }

    errorMessage(){
        return cy.get('.text-danger').contains('Please enter correct User Id and Password');
    }
}

export default NowRxLoginPage;
