import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';
import {Route, NavLink, Switch} from 'react-router-dom';
import FullPost from '../Blog/FullPost/FullPost';

class Blog extends Component {

    

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact
                            activeClassName='my-active'
                            activeStyle={{
                                color: 'red',
                                textDecoration: 'underline'
                            }}> Home </NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post'
                            }}> New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Switch>
                    <Route path="/new-post"  component={NewPost} />
                    <Route path="/:id"  component={FullPost} />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;