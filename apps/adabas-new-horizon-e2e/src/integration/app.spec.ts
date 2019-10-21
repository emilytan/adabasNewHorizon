import { getGreeting } from '../support/app.po';

describe('adabas-new-horizon', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to adabas-new-horizon!');
  });
});
