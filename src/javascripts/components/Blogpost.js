import React, { useContext, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import Modal from 'react-modal'
import { BlogpostContext } from './BlogpostList'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format } from 'date-fns'
const customStyles = {
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export default function Blogpost(props) {
  let { blogposts, setBlogposts, authenticated, setAuthenticated } = useContext(BlogpostContext)
  let [modalOpen, setModalOpen] = useState(false)
  const history = useHistory()
  const onLike = props.onLike
    const b = props.blogpost
    const deleteBlogpost = () => {
      fetch(`/api/blogposts/${b.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'same-origin',
    }).then(() => {
        toast('Successfully submitted', {
            onClose: () => {
                document.location = "/blogposts"
            }
        })

        setModalOpen(false)
    }).catch((error) => {
        toast('Failed to submit', {
            onClose: () => {
                document.location = "/blogposts"
            }
        })
    })
  }
    
    return (
      <>
        <div className="card">
          <h2>{b.title}</h2>
          <h4>by {b.author}</h4>
          <p>{b.story}</p>
          <ul className="extra">
            <li>
              <FaThumbsUp color="blue" onClick={ onLike }/> <small>{b.likes ? b.likes : 0 }</small>
            </li>
          </ul>
          <button className="primary" onClick={() => history.push(`/blogposts/${b.id}/edit`)}>Edit</button>
          <button className="primary" onClick={() => {
            if(authenticated) setModalOpen(true)
            else document.location = '/signin'
            }}>Delete</button>
        </div>

        <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)}
                style={customStyles} contentLabel="Are you sure?">
            <p>Are you sure you wan to delete this blogpost?</p>
            <button className="primary" onClick={deleteBlogpost}>Confirm Delete</button>
            <button className="primary" onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      </>
    )
  }