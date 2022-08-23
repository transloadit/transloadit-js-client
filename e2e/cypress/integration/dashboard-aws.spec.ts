describe('Dashboard with @uppy/aws-s3', () => {
  beforeEach(() => {
    cy.visit('/dashboard-aws')
    cy.get('.uppy-Dashboard-input:first').as('file-input')
  })

  it('should upload cat image successfully', () => {
    cy.get('@file-input').selectFile(['cypress/fixtures/images/cat.jpg', 'cypress/fixtures/images/traffic.jpg'], { force:true })
    cy.get('.uppy-StatusBar-actionBtn--upload').click()

    cy.get('.uppy-StatusBar-statusPrimary').should('contain', 'Complete')
    cy.window().then(({ uppy }) => {
      uppy.on('error', err => cy.task('log', String(err)))
    })
  })
})
