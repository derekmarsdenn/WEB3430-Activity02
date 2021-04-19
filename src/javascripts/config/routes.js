import express from 'express'

import {contactPage, aboutPage, indexPage, signInPage, signUpPage} from '../controllers/index'
import {allBlogpostsAPI, oneBlogpostAPI, createBlogpostAPI, updateBlogpostAPI, deleteBlogpostAPI} from '../controllers/blogposts'
import {contactAPI} from '../controllers/contacts'
import {registerUserAPI, signUserInAPI} from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars';
let router = express.Router()

function isSignedIn(req){
    try{
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    }catch(err){
        return false
    }
}

// function requireSignIn(req, res, next){
//     if(isSignedIn(req)){
//         next
//     }else{
//         res.status(401)
//         res.end()
//     }
// }

export function configureRoutes(app){
    app.all('*', (req, res, next) => {
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)

    router.get('/blogposts*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    // api endpoints
    router.get('/api/blogposts', allBlogpostsAPI)
    router.get('/api/blogposts/:id', oneBlogpostAPI)
    router.post('/api/blogposts', createBlogpostAPI)
    router.put('/api/blogposts/:id', updateBlogpostAPI)
    router.delete('/api/blogposts/:id', deleteBlogpostAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    router.post('/api/contact', contactAPI)

    app.use('/', router)
}