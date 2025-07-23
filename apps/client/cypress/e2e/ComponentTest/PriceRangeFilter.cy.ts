import { navigateToHotelListing } from "../../helper/hotelTest";
import React from "react";

describe('Component Testing for Price Range Filter', ()=>{
    it('Test Price Range Count', ()=>{
        navigateToHotelListing();
        let min = Infinity;
        let max = Number.NEGATIVE_INFINITY;

        cy.get('[data-cy=HotelListings]').each(($card)=>{
            cy.wrap($card).within(()=>{
                cy.get('data-cy=hotel-price').invoke('text').then((price)=>{
                    const p = parseInt(price);
                    if(p > max){max = Math.ceil(p)}
                    if(p < min){min = Math.floor(p)}
                })
            })
        })

        cy.get('price-slider-info').within(()=>{
            cy.get('[data-cy=minPrice]').invoke('text').then((minPrice)=>{
                expect(minPrice).equal(min);
            })
            cy.get('[data-cy=maxPrice]').invoke('text').then((maxPrice)=>{
                expect(maxPrice).equal(max);
            })
        })
        

    });
});