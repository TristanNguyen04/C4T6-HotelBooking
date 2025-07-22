import React from "react";
import HotelCard from '../../../src/components/HotelCard';
import { Tooltip } from "react-tooltip";

function clickLoadMoreIfPresent() {
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

describe('Amenities Filter', ()=>{


    it('Room Facilities Count Based on Destination', ()=>{
        cy.visit('/');
        cy.get('input[type=text]').type('Singapr'); 
        cy.get('[data-cy=DestinationSuggestions').eq(2).click(); // use eq() for the second item in the list

        // select the date
        const today = new Date();
        const formatMonth = (date:Date) => date.toLocaleDateString('en-GB' , {month: "long" , year: "numeric"});
        const currentMonth = formatMonth(today);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        // Format dates to match your component's output (dd/MM/yyyy)
        const pad = (n) => (n < 10 ? '0' + n : n);
        const todayDate = today.getDate();
        const startDateStr = `${pad(todayDate)}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
        const endDateStr = `${pad(lastDayOfMonth)}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
        cy.get('[data-cy=stay-period-toggle]').click();
        cy.get('[data-cy=stay-period-month').should('contain', currentMonth);
        cy.contains('button', `${todayDate}`).click();
        cy.contains('button', `${lastDayOfMonth}`).click();
        cy.contains('button', 'Done').click();
        cy.get('[data-cy=stay-period-toggle]').should('contain.text', `${startDateStr} - ${endDateStr}`);

        // Click Search
        cy.get('[data-cy=submitButton]').click()
        // wait for listings to pop up
        cy.get('[data-cy=Loading]').first().should('have.attr', 'data-class', 'HotelCardSkele');
        // After loading
        // iterate through all of the hotel cards present , get the amenities count for cross checking with filter bar
        const amenityMap = new Map();
        cy.get('[data-cy=HotelListings]', {timeout: 999999}).first().should('be.visible');
        clickLoadMoreIfPresent();
        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=AmenityList]').each(($amenityList)=>{
                    cy.wrap($amenityList).then(($list)=>{
                        const hasToolTip = $list.find('span[data-tooltip-id]').length > 0;
                        if(hasToolTip){
                            cy.wrap($list).find('span[data-tooltip-id]').each(($span)=>{
                                cy.wrap($span).trigger('mouseover');
                                const toolTipId = $span.attr('data-tooltip-id');
                                cy.get(`#${toolTipId}`).should('be.visible').invoke('text').then((toolTipText)=>{
                                    const amenityEntry = toolTipText.split('•').map((a)=> a.trim()).filter((a)=>a.length>0);
                                    amenityEntry.forEach((a)=>{
                                        if(amenityMap.has(a)){
                                            amenityMap.set(a , amenityMap.get(a) + 1);
                                        }
                                        else{
                                            amenityMap.set(a,1);
                                        }
                                    })
                                })
                            })
                        }
                        else{
                            cy.wrap($amenityList).within(()=>{
                                cy.get('span[data-cy=preview-amenities]').each(($span) => {
                                    const entry = $span.text().trim();
                                    cy.log("fuck", entry);
                                    if(amenityMap.has(entry)){amenityMap.set(entry,amenityMap.get(entry) + 1);}
                                    else{amenityMap.set(entry,1);}
                            })
                        })
                    }
                })
            })
        }).then(()=>{
            // after iterating through all and counting, cross check with amenities filter
            cy.log(JSON.stringify(Array.from(amenityMap.entries())));
        })// end of mapping hotel listing for verification of the filter bar
        cy.get('[data-cy=show-all-button]').click();
        cy.get('[data-cy^="amenity-"]').each(($label)=>{
            cy.wrap($label).within(()=>{
                cy.get('[data-cy^="name-"]').invoke('text').then((name)=>{
                    cy.get('[data-cy^="count-"]').invoke('text').then((countText)=>{
                        const count = parseInt(countText.replace(/[()]/g, ''));
                        expect(amenityMap.get(name)).equal(count);
                    })
                })
            })
        })
    }) 
    })
}) // end of describe