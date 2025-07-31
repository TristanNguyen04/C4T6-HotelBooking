import React from "react";
import { navigateToHotelListing } from "../../../helper/hotelTest";

describe('Sort By Price', ()=>{
    beforeEach(()=>{
        navigateToHotelListing();
    })
    it('Per Night: Sort Price from Low To High', ()=>{
        let p = 0;
        cy.get('#sort-select').select("Price (Low to High)");
        cy.wait(4000);
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=hotel-price]').each(($price)=>{
                    cy.wrap($price).invoke("text").then((price) => {
                        const hotelPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
                        cy.log(hotelPrice.toString())
                        if(p<hotelPrice){p = hotelPrice;}
                        else{throw new Error('Test Failed: Not Increasing down the list') }
                    })
                })
            })
        })
    });
    it('Total Stay: Sort Price from Low To High', ()=>{
        let p = 0;
        cy.get('#sort-select').select("Price (Low to High)");
        cy.get('[data-cy=toggle-stay-night]').check({force:true});
        cy.wait(4000);
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=hotel-price]').each(($price)=>{
                    cy.wrap($price).invoke("text").then((price) => {
                        const hotelPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
                        cy.log(hotelPrice.toString())
                        if(p<hotelPrice){p = hotelPrice;}
                        else{throw new Error('Test Failed: Not Increasing down the list') }
                    })
                })
            })
        })
    });
    it('Per Night: Sort Price from High to Low', ()=>{
        let p = Number.MAX_VALUE;
        cy.get('#sort-select').select("Price (High to Low)");
        cy.wait(4000);
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=hotel-price]').each(($price)=>{
                    cy.wrap($price).invoke("text").then((price) => {
                        const hotelPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
                        cy.log(hotelPrice.toString())
                        if(p>hotelPrice){p = hotelPrice;}
                        else{throw new Error('Test Failed: Not Decreasing down the list') }
                    })
                })
            })
        })
    });
    it('Total Stay: Sort Price from High to Low', ()=>{
        let p = Number.MAX_VALUE;
        cy.get('#sort-select').select("Price (High to Low)");
        cy.get('[data-cy=toggle-stay-night]').check({force:true});
        cy.wait(4000);
        cy.get("[data-cy=HotelListings]").each(($card) => {
            cy.wrap($card).within(()=>{
                cy.get('[data-cy=hotel-price]').each(($price)=>{
                    cy.wrap($price).invoke("text").then((price) => {
                        const hotelPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
                        cy.log(hotelPrice.toString())
                        if(p>hotelPrice){p = hotelPrice;}
                        else{throw new Error('Test Failed: Not Decreasing down the list') }
                    })
                })
            })
        })
    });
})