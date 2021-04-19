import mongoose from 'mongoose'

const Schema = mongoose.Schema


let blogpostSchema = Schema({
    title: String,
    story: String,
    author: String
})

blogpostSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

blogpostSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})

export let Blogpost = mongoose.model("Blogpost", blogpostSchema)