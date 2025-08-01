import { register , login} from "../../helper/dbutil";
describe('UC1,UC2: Sign Up and Register', ()=>{
    
    it('Register and verify successfully', ()=>{
        // this is for landing page -> registering successfully
        register('zhaohui@gmail.com' , '123456', 'zhao hui')
    });
    it('Login successfully', ()=>{
        login('zhaohui@gmail.com' , '123456')
    });

    // after register -> login : clear the booking table before the user table
    after(()=>{
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-bookingtable');
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-usertable');
    })
});

