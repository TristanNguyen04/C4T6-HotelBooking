describe('Log in E2E', ()=>{
    
    it('Register and verify successfully',  ()=>{
        // this is for landing page -> registering successfully
        cy.viewport('macbook-15');
        cy.visit('/');
        cy.get('[data-cy=register-button]').click();
        cy.get('[data-cy=input-email]').type('zhaohui@gmail.com');    
        cy.get('.gap-3 > .flex-1').click(); // click continue
        cy.get('#name').type('Ng Zhao Hui');
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('123456'); 
        cy.get('.gap-3 > .bg-red-400').click(); // click continue
        cy.get('.gap-3 > .bg-red-400').click().then(()=>{
            cy.wait(2000); // wait for the registration of the user to be logged in the test db
            cy.request('GET', 'http://localhost:3000/api/auth/get-uid?email=zhaohui@gmail.com').then((res)=>{
                cy.log(JSON.stringify(res.body));
                const token = res.body.token;
                cy.request('GET',`http://localhost:3000/api/auth/verify-email?token=${token}`).then((verifyRes)=>{
                    cy.log(JSON.stringify(verifyRes));
                    expect(verifyRes.status).to.equal(200);
                })
            })
        }); 
        // this is for clicking on the go to sign in page
        cy.get('[data-cy=go-to-login]').click();
        cy.url().should('include', '/login');
        cy.get('[data-cy=login-email]').should('exist');
    });
    it('Login successfully', ()=>{
        cy.viewport('macbook-15');
        cy.visit('/login');
        
        cy.get('[data-cy=login-email]').type('zhaohui@gmail.com');
        cy.get('[data-cy=login-password]').type('123456');
        cy.get('[data-cy=login-submit]').click();
    });

    // after register -> login : clear the booking table before the user table
    after(()=>{
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-bookingtable');
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-usertable');
    })
});

