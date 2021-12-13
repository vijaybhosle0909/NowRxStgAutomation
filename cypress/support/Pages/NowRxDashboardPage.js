///<reference types = 'cypress'/>
const locator = require('../../fixtures/locators.json');
const elementText = require('../../fixtures/elementTexts.json');

class NowRxDashboardPage{

    typeSearchLocation(locationValue){
        cy.get(locator.dashboardPageLocator.locationSearchBox).type(locationValue);
    }

    selectLocation(){
       cy.find(locator.dashboardPageLocator.locationDropdownList).contains(elementText.QVTTLocationText).click();
    }
    
    getUserName(){
        return cy.get(locator.dashboardPageLocator.userProfileName);
    }

    clickProfileName(){
        cy.get(locator.dashboardPageLocator.userProfileName).click({force:true});
    }

    clickLogout(){
        return cy.get(locator.dashboardPageLocator.logout).contains(elementText.LogoutButtonText);
    }

    clickSetLocationButton(){
        cy.get(locator.dashboardPageLocator.setLocationButton).contains(elementText.SetLocationButtonText).click();
    }

    goBack(){
        cy.go('back');
    }
}

export default NowRxDashboardPage;