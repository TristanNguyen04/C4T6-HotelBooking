import React from "react";
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


    })
})