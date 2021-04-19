export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'Blogster'})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'Blogster'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content: 'contact', title: 'Blogster'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'Blogster'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Blogster'})
}