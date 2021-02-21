/// <reference types="Cypress" />
describe('Default Test', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        const rootUser = {
            'username': 'admin',
            'name': 'admin',
            'password': 'admin'
        }
        cy.request('POST', 'http://localhost:3001/api/users', rootUser)
        cy.visit('http://localhost:3001')
    })
    it('Page should show login page by default', () => {
        cy.get('form').should('contain', 'Username').and('contain', 'Password').get('button').should('have.text', 'Sign In')
    })
    describe('login test', () => {
        it('only logs in with the correct user', () => {
            cy.login('admin', 'admin')
            cy.contains('admin successfully logged in')
        })
        it('entering wrong information prints error', () => {
            cy.login('wrong', 'credentials')
            cy.contains('Wrong Username or Password')
        })
    })
    describe('logged in user has some actions', () => {
        it('logged in user can create a new blog', () => {
            cy.login('admin', 'admin')
            cy.contains('Create New Blog').click()
            cy.createBlog('A title', 'The Author', 'A link')
            cy.contains('A title by The Author')
        })

        it('logged in user can like a blog', () => {
            cy.login('admin', 'admin')
            cy.contains('Create New Blog').click()
            cy.createBlog('A title', 'The Author', 'A link')
            cy.get('[data-cy=blogLink').click()
            cy.contains('Likes: 0')
            cy.get('[data-cy=likeButton]').click()
            cy.contains('Likes: 1')
        })
        it('logged in user can delete blog if he created it', () => {
            cy.login('admin', 'admin')
            cy.createBlog('remove test', 'auth', 'url')
            cy.contains('remove test')
            cy.get('[data-cy=blogLink]').click()
            cy.get('[data-cy=removeButton]').click()
            cy.contains('Successfully deleted blog remove test by auth')
        })
        it('logged in user can\'t delete a blog if he is not the owner', () => {
            cy.login('admin', 'admin')
            cy.createBlog('this will not be removed', 'auth', 'url')
            cy.get('[data-cy=userIcon]').click()
            cy.get('[data-cy=logoutButton]').click()
            const newuser = {
                'username': 'test',
                'name': 'test',
                'password': 'test'
            }
            cy.request('POST', 'http://localhost:3001/api/users', newuser)
            cy.login('test', 'test')
            cy.get('[data-cy=blogLink]').click()
            cy.get('[data-cy=removeButton]').click()
            cy.contains('this will not be removed')
            cy.contains('Couldn\'t delete blog this will not be removed. Message: you don\'t have the permission to perform specified action')
        })
        describe('showing blogs', () => {
            it('blogs are sorted based on likes', () => {
                const blog1 = {
                    'title': 'A',
                    'author': 'B',
                    'likes': 3,
                    'url': 'C'
                }
                const blog2 = {
                    'title': 'D',
                    'author': 'E',
                    'likes': 2,
                    'url': 'F'
                }
                cy.request('POST', 'http://localhost:3001/api/login', { 'username': 'admin', 'password': 'admin' }).then(({ body }) => {
                    localStorage.setItem('CU', JSON.stringify(body))
                    console.log(body)
                    cy.request({
                        'url': 'http://localhost:3001/api/blogs',
                        'method': 'POST',
                        'body': blog2,
                        'headers': {
                            Authorization: `bearer ${body.token}`
                        }
                    })
                    cy.request({
                        'url': 'http://localhost:3001/api/blogs',
                        'method': 'POST',
                        'body': blog1,
                        'headers': {
                            'Authorization': `bearer ${body.token}`
                        }
                    })
                    cy.reload()
                })
                cy.get('[data-cy=blogLink]').eq(0).click()
                cy.contains('Likes: 3') //If it passes first blog is one with most likes
                cy.go('back')
                cy.get('[data-cy=blogLink]').eq(1).click()
                cy.contains('Likes: 2') //Second Likes property is 2 one with less likes
            })
        })
    })
})
