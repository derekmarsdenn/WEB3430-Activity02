import React, { useState, createContext, useEffect } from 'react'
import Blogpost from './Blogpost'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from './Pages'
import BlogpostForm from './BlogpostForm'
import { useCookies } from 'react-cookie'

export const BlogpostContext = createContext()

export default function BlogpostList() {
  const [blogposts, setBlogposts] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory()

  useEffect(() => {
    if(!blogposts){
      fetch('/api/blogposts', {
        credentials: 'same-origin'
      })
        .then(response => response.text())
        .then((data) => {
          // console.log(data)
          setBlogposts(JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
            if (typeof value === "string" && dateFormat.test(value)) {
              return new Date(value)
            }

            return value
          }))})
        .catch(console.error)
      }
  })

  if(!blogposts)
    return <p>Loading...</p>

      return (
        <BlogpostContext.Provider value={{blogposts, setBlogposts, authenticated, setAuthenticated}}>
          <div className="row">
            <div className="column-left">
              <div>
                <Route path="/blogposts">
                  <button className="primary" onClick={() => history.push('/blogposts/new')}>Create Blogpost</button>
                </Route>
              </div>
              <h1>Here's the latest...</h1>
              <main>
                <Switch>
                  <Route exact path="/blogposts">
                    {blogposts.map((b, i, s) => {
                    return <Blogpost key={b.id} blogpost={b} onLike={ 
                      () => {
                        blogposts[i].likes = blogposts[i].likes ? blogposts[i].likes + 1 : 1

                        setBlogposts(blogposts.map(b => b))
                      }
                    } />
                    })}
                  </Route>
                  <Route path="/blogposts/new"><BlogpostForm/></Route>
                  <Route path="/blogposts/:bid/edit"><BlogpostForm/></Route>
                  <Redirect from="" to="/blogposts"/>
                  <Route path="*"><ErrorNotFound/></Route>
                </Switch>

              </main>
            </div>
            <div className="column-right">
              <h2>People you may know...</h2>
                <div>
                  <h4>@john_hancock1776</h4>
                  <button className="primary">Follow</button>
                  <hr/>
                </div>
                <div>
                  <h4>@edgarpoe</h4>
                  <button className="primary">Follow</button>
                  <hr/>
                </div>
                <div>
                  <h4>@g.orwell84</h4>
                  <button className="primary">Follow</button>
                  <hr/>
                </div>
                <div>
                  <h4>@nick_pepperwood4D</h4>
                  <button className="primary">Follow</button>
                  <hr/>
                </div>
            </div>
          </div>
        </BlogpostContext.Provider>
      )
    }
