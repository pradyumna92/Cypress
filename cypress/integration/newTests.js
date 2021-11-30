/// <reference types="cypress" />

const {describe} = require ('mocha');
import Login from './pageobjects/login';

describe ('Login using fixtures', function () {
  const login = new Login ();

  beforeEach (() => {
    cy.viewport ('macbook-15');
    cy.fixture ('userDetails').as ('user');
  });

  it('Login using Page object model', () => {
    login.website ();
    cy.wait (5000);
    login.userName ().type ('mercury');
    login.password ().type ('mercury');
    login.signIn ().click ();
    cy.get ('h3').should ('contains.text', 'Login Successfully');
  });

  it ('Login using custom commands', () => {
    cy.login ('mercury', 'mercury');

    cy.wait (5000);
  });

  it ('Login using fixtures', () => {
    login.website ();
    cy.fixture ('userDetails').then (user => {
      cy.wait (3000);
      login.userName ().type (user.userName);
      login.password ().type (user.password);
      login.signIn ().click ();
    });
  });

  it ('Login using pom and fixtures', function () {
    login.website ();
    login.userName ().type (this.user.userName);
    login.password ().type (this.user.password);
    login.signIn ().click ();
  });

  it ('Loop the table using each', () => {
    cy.login ('mercury', 'mercury');
    cy.wait (5000);
    cy.get ('table>tbody>tr>td>a').each (($el, index, $list) => {
      cy.log ('Each individual element' + $el.text ());
      cy.log ('List of elements' + $list.text ());

      if ($el.text ().includes ('Flights')) {
        cy.wait (2000);
        cy.xpath ("//a[normalize-space()='Flights']").click ();
        cy
          .get ("img[src='images/mast_flightfinder.gif']")
          .should ('be.visible');
      } else {
        cy.log ('Not clicked on:' + $el.text ());
      }
    });
  });

  it ('DropDown and Radio buttons', () => {
    cy.login ('mercury', 'mercury');
    cy.wait (5000);
    cy.get ('table>tbody>tr>td>a').each (($el, index, $list) => {
      cy.log ('Each individual element' + $el.text ());
      cy.log ('List of elements' + $list.text ());

      if ($el.text ().includes ('Flights')) {
        cy.wait (2000);
        cy.xpath ("//a[normalize-space()='Flights']").click ();
        cy
          .get ("img[src='images/mast_flightfinder.gif']")
          .should ('be.visible');
      } else {
        cy.log ('Not clicked on:' + $el.text ());
      }
    });

    cy.get ("select[name='fromPort']").select ('San Francisco');
    cy.get ("select[name='fromMonth']").select ('February');
    cy.get ("input[name='findFlights']").click ();
  });

  // it('Loop through table 2', () => {
  //   cy.visit ('https://testautomationpractice.blogspot.com/');
  //   cy.wait (5000);
  //   cy.get ('table > tbody > tr> td:nth-child(2)').each ((el, index) => {
  //     const text = el.text ();
  //     if (text.includes ('Amod')) {
  //       cy.get ('table > tbody > tr> td:nth-child(3)').eq (index);
  //       cy.get ('table > tbody > tr> td:nth-child(1)').eq (index);
  //     }
  //   });
  // });

  // it ('Check boxes', () => {
  //   cy.visit ('https://demo.automationtesting.in/Register.html');
  //   cy.wait (5000);
  //   cy.get ('table > tbody > tr> td:nth-child(2)').each ((el, index, list) => {
  //     const text = el.text ();
  //     if (text.includes ('Amod')) {
  //       cy.get ('table > tbody > tr> td:nth-child(3)').eq (index);
  //       cy.get ('table > tbody > tr> td:nth-child(1)').eq (index);
  //     }
  //   });
  // });

  it ('Getting values from table', () => {
    login.website();
    cy.wait (5000);
    cy.get ('table > tbody > tr> td> font').each ((el, index, list) => {
      if (el.text ().includes ('Atlanta')) {
        cy.log (cy.xpath ("//b[normalize-space()='$398']"));
        cy
          .xpath ("//b[normalize-space()='$398']")
          .should ('contains.text', '$398');
      }
    });
  });

  it ('Write File', function () {
    cy.writeFile ('sample.txt', 'Writing on sample file\n');

    cy.writeFile ('sample.txt', 'Second line', {flag: 'a+'});

    cy.readFile ('sample.txt').should ('contains', 'Writing on sample ');
  });
});
