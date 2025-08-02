export function login(email:string, password:string){
    cy.viewport('macbook-15');
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type(email);
    cy.get('[data-cy=login-password]').type(password);
    cy.get('[data-cy=login-submit]').click();
};

export function register(email:string, password:string, name:string){
    cy.viewport('macbook-15');
    cy.visit('/');
    cy.get('[data-cy=register-button]').click();
    cy.get('[data-cy=input-email]').type(email);    
    cy.get('.gap-3 > .flex-1').click(); // click continue
    cy.get('#name').type(name);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password); 
    cy.get('.gap-3 > .bg-red-400').click(); // click continue
    cy.get('.gap-3 > .bg-red-400').click().then(()=>{
        cy.wait(2000); // wait for the registration of the user to be logged in the test db
        cy.request('GET', `http://localhost:3000/api/auth/get-uid?email=${encodeURIComponent(email)}`).then((res)=>{
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
    cy.wait(1000);
}