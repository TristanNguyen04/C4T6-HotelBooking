import { login , register } from "../../helper/dbutil";
import { navigateToHotelListing } from "../../helper/hotelTest";
describe('UC9, 10, 11, 12, 13, 14 : Booking + Payment', ()=>{
    let name: string = 'test123';
    let email: string = 'test123@gmail.com';
    let password: string = '123@123';
    let hotelprice: number;
    let uid:string;
    before(()=>{
        register(email,password,name);
        cy.request('GET', `http://localhost:3000/api/auth/get-uid?email=${encodeURIComponent(email)}`).then((res) => {
            expect(res.status).to.eq(200);
            uid = res.body.id;
            cy.log(uid);
        });
    })

    it('Select Hotel to book', ()=>{
        login(email, password);
        navigateToHotelListing();
        cy.get('[data-cy=HotelListings] > *').first().within(()=>{
            // get the first available hotel room and click book
            cy.get('[data-cy=hotel-price]').invoke('text').then((price)=>{
                const match = price.match(/[\d,.]+/);
                hotelprice = parseFloat(match[0].replace(/,/g, ''));
            });
            cy.get('[data-cy=view-details-button]').click();
        });

        cy.get('[data-cy=loading-hotel-details]', { timeout: 10000 }).should('not.exist');
        cy.get('[data-cy=hotel-details-price]').invoke('text').then((text) => {
            const actualPrice = parseFloat(text.replace(/[^0-9.]/g, ''));
            cy.log('actual price', actualPrice)
            expect(actualPrice).to.be.within(hotelprice - 1, hotelprice + 1);
        });

        cy.get('[data-cy=click-to-book]').eq(0).should('be.visible').click();
        cy.get('[data-cy=loading-booking-details]', { timeout: 10000 }).should('not.exist');
        cy.get('[data-cy=first-name]').type(name);
        cy.get('[data-cy=last-name]').type(name);
        cy.get('[data-cy=phone-number]').type('12345678');
        cy.get('[data-cy=special-request]').type('Birthday Surprise');
        // cy.get('[data-cy=continue-to-payment]').should('be.visible').click();
        cy.wait(500).then(()=>{
        const sessionId = "test-session-id";
        cy.request('POST', 'http://localhost:3000/api/payments/mock-success', {
            sessionId,
            userId: uid,  // Ensure you store this when you register/login
            bookings: [{
            hotelId: "0Tki",
            hotelName: "Test Hotel",
            roomKey: "Deluxe-123",
            roomDescription: "Deluxe Room with Ocean View",
            roomImage: "https://example.com/room.jpg",
            request: "Birthday Surprise",
            guestName: `${name} ${name}`,
            guestNumber: "12345678",
            checkin: "2025-09-25T00:00:00.000Z",
            checkout: "2025-09-30T00:00:00.000Z",
            guests: "2",
            baseRateInCurrency: hotelprice,
            includedTaxesAndFeesInCurrency: hotelprice * 1.1
            }]
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
        })
    })
    after(()=>{
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-bookingtable');
        cy.request('GET', 'http://localhost:3000/api/dbutil/clear-usertable');
    })
})