import React, { useContext, useState } from 'react'
import { BlogpostContext } from './BlogpostList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    title: yup.string().required(),
    story: yup.string().required(),
    author: yup.string().required()
})
export default function BlogpostForm() {
    let {blogposts, setBlogposts, authenticated, setAuthenticated} = useContext(BlogpostContext)
    let {bid} = useParams()

    if(!authenticated){
        document.location = '/signin'
        return <></>
    }

    let blogpost = bid ? blogposts.find(b => b.id == bid) : {}
    let is_new = bid === undefined
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: is_new ? {
            title: "",
            story: "",
            author: ""
        } : {...blogpost},
        validationSchema,
        onSubmit(values){
            fetch(`/api/blogposts${is_new ? '' : '/' + blogpost.id}`, {
                method: is_new ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully posted', {
                    onClose: () => {
                        document.location = "/blogposts"
                    }
                })
            }).catch((error) => {
                toast('Failed to post', {
                    onClose: () => {
                        document.location = "/blogposts"
                    }
                })
            })

        }
    })
    
    const history = useHistory()
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>{ is_new ? 'Create a post' : 'Edit a post' }</h1>
            <div className="field">
                <label htmlFor="title">Title</label>
                <div className="control">
                    <input type="text" name="title" value={values.title} onChange={handleChange}/>
                    <VHelp message={errors.title}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="story">Story!</label>
                <div className="control">
                    <textarea type="text" name="story" value={values.story} onChange={handleChange}></textarea>
                    <VHelp message={errors.story}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="author">Author</label>
                <div className="control">
                    <input type="text" name="author" value={values.author} onChange={handleChange}/>
                    <VHelp message={errors.author}/>
                </div>
            </div>

            <div className="field">
                <label></label>
                <div className="control">
                    <button type="submit" className="primary">Submit</button>
                    <button className="primary" onClick={()=>history.goBack()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

