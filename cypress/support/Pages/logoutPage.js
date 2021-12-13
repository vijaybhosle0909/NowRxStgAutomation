const locator = require('../../fixtures/locators.json');
class NowRxLogoutPage{
    unAuthorizedAccessPopup(){
        return cy.get(locator.logoutPageLocator.unAuthorizesAccessPopup);
    }
}

export default NowRxLogoutPage;