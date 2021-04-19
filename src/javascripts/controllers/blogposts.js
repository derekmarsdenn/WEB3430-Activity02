import {Blogpost} from '../models/blogpost'

// GET /api/blogposts
export const allBlogpostsAPI = (req, res, next) => {
    Blogpost.find().select().exec((err, blogposts) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else{
            res.write(JSON.stringify(blogposts))
            res.end()
        }
    })
}

// GET /api/blogposts/:id
export const oneBlogpostAPI = (req, res, next) => {
    Blogpost.find({_id: req.params.id}).select().exec((err, blogpost) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else{
            res.write(JSON.stringify(blogpost))
            res.end()
        }
    })
}

// POST /api/blogposts
export const createBlogpostAPI = (req, res, next) => {
    let blogpost = new Blogpost(req.body)
    blogpost.added_at = new Date()
    blogpost.updated_at = new Date()
    blogpost.save( err => {
        if(err){
            res.json({success: false, message: "Blog post failed"})
            res.end()
        }else{
            res.end()
        }
    })
}

// PUT /api/blogposts/:id
export const updateBlogpostAPI = (req, res, next) => {
    Blogpost.findOne({_id: req.params.id}).select().exec((err, blogpost) => {
        if(err){
            res.json({success: false, message: "Unable to update"})
            res.end()
        }else{
            Object.assign(blogpost, req.body)
            blogpost.updated_at = new Date()
            blogpost.save( err => {
                if(err){
                    res.json({success: false, message: "Unable to update"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}

// DELETE /api/blogposts/:id
export const deleteBlogpostAPI = (req, res, next) => {
    Blogpost.findOne({_id: req.params.id}).select().exec((err, blogpost) => {
        if(err){
            res.json({success: false, message: "Unable to delete"})
            res.end()
        }else{
            Blogpost.findByIdAndDelete(req.params.id, err => {
                if(err){
                    res.json({success: false, message: "Unable to delete"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}