import {Hotel} from '../../src/types/hotel';
export const mockHotels: Hotel[] = [
    {
      id: "1",
      name: "Hotel A",
      latitude: 1.28624,
      longitude: 103.852889,
      address: 'Hotel A address',
      currency: 'SGD',
      price: 120,
      totalPrice: 120,
      rating: 5.2,
      amenities: {'Wifi': true,'Pool': true,'Gym': false,'Parking': true,'Air Conditioning': false,'Restaurant': true,'Bar': true,'Spa': false},
      distance: 100,
      searchRank: 1,
      description: "Hotel A best",
      image_details: { suffix: ".jpg", count: 86, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 90, popularity: 10 } },
    },
    {
      id: "2",
      name: "Hotel B",
      latitude: 1.48624,
      longitude: 103.952889,
      address: 'Hotel B address',
      currency: 'SGD',
      price: 220,
      totalPrice: 220,
      rating: 5,
      amenities: {'Wifi': true,'Pool': false,'Gym': false,'Parking': true,'Air Conditioning': true,'Restaurant': false,'Bar': true,'Spa': true},
      distance: 50,
      searchRank: 1,
      description: "Hotel B best",
      image_details: { suffix: ".jpg", count: 21, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 70, popularity: 1 } },
    },
    {
      id: "3",
      name: "Hotel C",
      latitude: 1.68624,
      longitude: 103.352889,
      address: 'Hotel C address',
      currency: 'SGD',
      price: 330,
      totalPrice: 330,
      rating: 1.2,
      amenities: {'Wifi': true,'Pool': false,'Gym': true,'Parking': false,'Air Conditioning': true,'Restaurant': true,'Bar': false,'Spa': false},
      distance: 210,
      searchRank: 1,
      description: "Hotel C worst",
      image_details: { suffix: ".jpg", count: 86, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/" },
      categories: { overall: { name: "Overall", score: 80, popularity: 9 } },
    }
  ];


export function clickLoadMoreIfPresent() {
  cy.get('body').then(($body)=>{
    if($body.find('button[data-cy=LoadMoreHotels]').length > 0){
      cy.get('button[data-cy=LoadMoreHotels]', { timeout: 5000 }).then($btn => {
        if ($btn.length && !$btn.is(':disabled') && $btn.is(':visible')) {
          cy.wrap($btn).click();
          cy.wait(500);
          clickLoadMoreIfPresent();
        }
      })
    }
    else{return;}
  });
}

export function navigateToHotelListing(){
  cy.visit('/');
  cy.wait(1000);
  cy.get('input[type=text]').type('Singapr'); 
  cy.get('[data-cy=DestinationSuggestions]').eq(2).click(); // use eq() for the second item in the list

  // select the date
  const today = new Date();
  const formatMonth = (date:Date) => date.toLocaleDateString('en-GB' , {month: "long" , year: "numeric"});
  // Format dates to match your component's output (dd/MM/yyyy)
  const pad = (n) => (n < 10 ? '0' + n : n);
  const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextMonth = formatMonth(nextMonthDate);
  const firstDay = 10;
  const lastDayOfNextMonth = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, 0).getDate();
  const startDateStr = `${pad(firstDay)}/${pad(nextMonthDate.getMonth() + 1)}/${nextMonthDate.getFullYear()}`;
  const endDateStr = `${pad(lastDayOfNextMonth)}/${pad(nextMonthDate.getMonth() + 1)}/${nextMonthDate.getFullYear()}`;

  cy.get('[data-cy=stay-period-toggle]').click();
  cy.get('[data-cy=stay-period-month').should('contain', formatMonth(today));

  cy.get('[data-cy=calendar-next-month]').click();
  cy.get('[data-cy=stay-period-month]').should('contain', nextMonth);

  cy.contains('button', `${firstDay}`).click();
  cy.contains('button', `${lastDayOfNextMonth}`).click();

  cy.contains('button', 'Done').click();
  cy.get('[data-cy=stay-period-toggle]').should('contain.text', `${startDateStr} - ${endDateStr}`);

  // Click Search
  cy.get('[data-cy=submitButton]').click()
  // wait for listings to pop up
  cy.get('[data-cy=Loading]').first().should('have.attr', 'data-class', 'HotelCardSkele');
  // After loading
  // iterate through all of the hotel cards present , get the amenities count for cross checking with filter bar
  
  cy.get('[data-cy=HotelListings]', {timeout: 999999}).first().should('be.visible');
  clickLoadMoreIfPresent();
  cy.wait(1000);
}