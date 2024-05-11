/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  // setiap mulai testing akan ke beforeEach dulu
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // verifikasi elemen yg tampil di login
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // klik login di klik tanpa isi username
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert utk menampilkan pesan dri api
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id"is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // klik login tanpa isi password
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert utk menampilkan pesan dri api
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password"is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // isi password yg salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // klik login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert utk menampilkan pesan dari api
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"User ID or password" is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // isi password
    cy.get('input[placeholder="Password"]').type('test123456');

    // tekan tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi bahwa elemen yang berada dihomepage ditampilkan
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Sign out').should('be.visible');
  });
});
