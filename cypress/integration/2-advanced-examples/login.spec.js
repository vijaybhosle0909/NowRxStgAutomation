const user = require('../../fixtures/users.json');
const message = require('../../fixtures/messages.json');
import NowRxLoginPage from '../../support/Pages/NowRxLoginPage';
import NowRxDashboardPage from '../../support/Pages/NowRxDashboardPage';
import NowRxLogoutPage from '../../support/Pages/logoutPage';

const loginPageObject = new NowRxLoginPage();
const dashboardPageObject = new NowRxDashboardPage();
const logoutPageObject = new NowRxLogoutPage();

describe('Login Suite', ()=>{

    beforeEach(()=>{
        cy.visit("/")
    })

    it('Login Without username and password', ()=>{
        loginPageObject.loginButton().should('be.disabled');
    })

    it('Login With only username', ()=>{
        loginPageObject.typeUserId(user.onlyUserName);
        loginPageObject.loginButton().should('be.disabled');
    })

    it('Login With only password', ()=>{
        loginPageObject.typePassword(user.onlyPassword);
        loginPageObject.loginButton().should('be.disabled');
    })

    it('Login with valid credentials', ()=>{
        loginPageObject.typeUserId(Cypress.env('userId'));
        loginPageObject.typePassword(Cypress.env('password'));
        loginPageObject.clickLoginButton();

        dashboardPageObject.getUserName().should('have.text', Cypress.env('userName'));
    })

    it('Session status after logged out', ()=>{
        loginPageObject.typeUserId(Cypress.env('userId'));
        loginPageObject.typePassword(Cypress.env('password'));
        loginPageObject.clickLoginButton();

        dashboardPageObject.clickProfileName();
        dashboardPageObject.clickLogout().click({force:true});
        cy.wait(4000);
        dashboardPageObject.goBack();
        logoutPageObject.unAuthorizedAccessPopup().should('be.visible');
        dashboardPageObject.getUserName().should('not.have.text', 'vijay');
    })

    user.nowRxUser.forEach((credential)=>{
        it('Login Test for ' + credential.role + ' role', ()=>{
            loginPageObject.typeUserId(credential.userId);
            loginPageObject.typePassword(credential.password);
            loginPageObject.clickLoginButton();
            
            dashboardPageObject.getUserName().should('have.text', credential.userName);

            // const errorMessage= loginPageObject.errorMessage();
            
            // if(errorMessage.should('not.exist')){
            //     dashboardPageObject.getUserName().should('not.exist');
            //     cy.log('Print If');
            // }
            // else{
            //     cy.log('Print else');
            //     dashboardPageObject.getUserName().should('have.text', credential.userName);
            // }
        })
    })

    it('Location selection test', ()=>{
        loginPageObject.typeUserId('vijayclerk@yopmail.com');
        loginPageObject.typePassword('password')
        loginPageObject.clickLoginButton();

        dashboardPageObject.typeSearchLocation('q');
        cy.get('.dropdown-item').contains('QVTT').click();
        // dashboardPageObject.selectLocation();
        dashboardPageObject.clickSetLocationButton();
    })

    // afterEach(()=>{
    //     dashboardPageObject.clickProfileName();
    //     dashboardPageObject.clickLogout().click({force:true});
    // })
})
