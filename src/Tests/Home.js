/* eslint-disable */

describe('My First Test', function() {
  it('finds the content "type"', function() {
    cy.visit('http://localhost:8080/')

    cy.contains('h1.sc-bxivhb.gYIuKe')
  })
})
