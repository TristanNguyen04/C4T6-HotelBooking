import { login, register } from '../../helper/dbutil';

describe('UC 16: Change Profile Details , Delete Account', ()=>{
    let email:string = '123@gmail.com'
    let password:string = 'hashedpassword'
    let name:string = 'zh123'
    let newName:string = 'NewName'
    let newPassword: string = 'newpass';
    it('Change Profile Details : Name', ()=>{
        // add acc to test db
        register(email,password,name);
        login(email,password);
        // click on profile icon
        cy.get('[data-cy=click-profile-icon]').should('be.visible').click();
        // go to profile page
        cy.get('[data-cy=go-to-profile]').should('be.visible').click();
        // change name input
        cy.get('[data-cy=change-name-input]').should('be.visible').clear();
        cy.get('[data-cy=change-name-input]').type(newName);
        // update profile
        cy.get('[data-cy=update-profile]').should('be.visible').click();
        // success message
        cy.get('div.text-green-600.bg-green-50')
            .should('be.visible')
            .and('contain', 'Profile updated successfully!');
        cy.get('[data-cy=profile-name]')
            .should('be.visible')
            .and('contain.text', newName);
    });
    it('Change Profile Details : Password', ()=>{
        login(email,password);
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        // click on profile icon
        cy.get('[data-cy=click-profile-icon]').should('be.visible').click();
        // go to profile page
        cy.get('[data-cy=go-to-profile]').should('be.visible').click();
        // key current password
        cy.get('[data-cy=key-current-pw]').should('be.visible').type(password);
        // key new password
        cy.get('[data-cy=key-new-pw]').should('be.visible').type(newPassword);
        // key new password
        cy.get('[data-cy=key-confirm-pw]').should('be.visible').type(newPassword);
        // change pw
        cy.get('[data-cy=change-pw]').should('be.visible').click();
        // check for password changed successfully text
        cy.get('div.text-green-600.bg-green-50').should('contain.text', 'Password changed successfully!');

    });
    it('Change Profile Details : Log in with new password', ()=>{
        login(email,newPassword);
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');

    });
    it('Delete Account', ()=>{
        // log in
        login(email,newPassword);
        cy.wait(1000);
        // click on profile icon
        cy.get('[data-cy=click-profile-icon]').should('be.visible').click();
        // go to profile page
        cy.get('[data-cy=go-to-profile]').should('be.visible').click();
        // click on delete my acc
        cy.get('[data-cy=delete-my-acc]').should('be.visible').click();
        // enter password
        cy.get('[data-cy=enter-delete-pw]').should('be.visible').type(newPassword);
        // click on cancel delete
        cy.get('[data-cy=cancel-delete]').should('be.visible').click();
        // click on delete my acc
        cy.get('[data-cy=delete-my-acc]').should('be.visible').click();
        // enter password
        cy.get('[data-cy=enter-delete-pw]').should('be.visible').type(newPassword);
        // click on delete account
        cy.get('[data-cy=confirm-delete-account]').should('be.visible').click();
    })
    it('Try and log in to deleted account', ()=>{
        // log in
        login(email,password);
        cy.wait(1000);
    })
    after(()=>{
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-bookingtable');
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-usertable');
    })
});