import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';


class Posts extends Component{

    state = {
        posts: []
    }

    componentDidMount(){
        axios.get('/posts').then(
            response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {...post, author:'Ziping'}
                });
                this.setState({posts: updatedPosts});
            }
        );
     };

    postSelectedHandler = (id) => {
        this.props.history.push({pathname:'/'+id});
        //this.props.history.push('/'+id);
    }

    render(){

        const posts = this.state.posts.map(post => {
            return (//<Link to={'/' + post.id} >
                        <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                    //</Link>);
            )

        });

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;