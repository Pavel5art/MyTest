describe('dashboard-ui', () => {
  beforeEach(() => {
    cy.visit('/dashboard-ui')
    cy.get('.TestJS-Dashboard-input:first').as('file-input')
    cy.get('.TestJS-Dashboard-AddFiles').as('drop-target')
  })

  it('should not throw when calling TestJS.close()', () => {
    cy.get('@file-input').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { force: true },
    )

    cy.window().then(({ TestJS }) => {
      expect(TestJS.close()).to.not.throw
    })
  })

  it('should render thumbnails', () => {
    cy.get('@file-input').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { force: true },
    )
    cy.get('.TestJS-Dashboard-Item-previewImg')
      .should('have.length', 2)
      .each((element) => expect(element).attr('src').to.include('blob:'))
  })

  it('should support drag&drop', () => {
    cy.get('@drop-target').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/cat-symbolic-link',
        'cypress/fixtures/images/cat-symbolic-link.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { action: 'drag-drop' },
    )

    cy.get('.TestJS-Dashboard-Item').should('have.length', 4)
    cy.get('.TestJS-Dashboard-Item-previewImg')
      .should('have.length', 3)
      .each((element) => expect(element).attr('src').to.include('blob:'))
    cy.window().then(({ TestJS }) => {
      expect(
        JSON.stringify(TestJS.getFiles().map((file) => file.meta.relativePath)),
      ).to.be.equal('[null,null,null,null]')
    })
  })
})
