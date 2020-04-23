# Section11: Multi-page feeling in a single page App: Routing

Few questions:

- Can't perform a React state update on an unmounted component. - Memory Leak Error
    + https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8140669#questions/9445409


Note: Routing is not build in React. We will use another package to support routing. React is much more like a component creation Library, now we are turning it into something like framework by adding the routing feature.

Routing is about being able to show different pages to the user. In a Single Page Application, we want to show the user different pages for different URLs. The trick is that we dont actually have multiple HTML file but we use javascript to render different pages for different path. So we dont really have different files but simply re-render parts of that single pages or maybe the entire page depending on which path the user navigated to in our application.

Package: `npm install --save react-router-dom`

To enable routing, we need to use `import {BrowserRouter} from 'react-router-dom';` and use `BrowserRouter` to wrap the Component that need routing. `BrowserRouter` has a basename prop, which is set to `/` by default, if we are serving our app under a subdirectory, we need to adjust this.

Inside the Component we need routing, we need to `import {Route} from 'react-router-dom';` We use the Route Component like this.  
`<Route path="/" exact render={()=> <h1>Home</h1>} />`

Props:

- path: the path that should be active
    + by default, the path only looks if you start with that path
    + overwritting this behaviour by adding one more prop `exact=true`
- render: holds a function that return JSX code
- component: holds a reference to a Component. `{Posts}`

***
One little problem with current approach. Each time we click a link, it actually reloads the page.(ie: your Javascrip code is starting a new run, all previous application state is lost). What we want is to just re-render the page in the parts where is needs to be re-rendered to look like a new page.

To solve this, we will use `<Link></Link>` component provided by react-router-dom instead of `<a></a>`  
The `to` property in `Link`:

- simple form: a string '/'
- a Javascript object: <span style="color: blue">read more on this later</span>
```javascript
{
    pathname: '/new-post', // always a absoult path
    hash: '#submit',
    search: '?quick-submit=true'
}
```

***
react-router-dom provided some props that they build automatically. in each Component in the form of this `<Route path="/" exact component={Posts} />`, it set up props for `Posts`.(history, location, match)  
What if we want get access of these info for the subcompoents inside Posts, ie:Post

- we can simply pass it down or
- using a HOC `withRouter` provided by react-router-dom to wrap `Posts`

***
What if we want to style the active link(ie: when we are on the new-post, the new-post link should be colored or something).  
Using the `<Link>` will not work, instead we will use `<NavLink>` it is similer to `<Link>` but it added a class -- `class='active'` to the underlying `<a>` tage, hence we can use this class to stying the link.We can use another props to change this className, `activeClassName="my-active"` will set the active link class to my-active. `activeStyle = {{color:'red',textDecoration:'underline'}}` can be used to set the styling.   
Note: the active class will also added to any path that start with the actual active link. Using exact to avoide this.

***
### Setting Dynamic Route path(Route Parameter):  
we will use `<Route paht="/:id"` the `:` tells the react Router that there is something dynamically added. Whenever use this, we need to be careful the sequence we render `<Route>`.  
``` JSX
<Route path="/" exact component={Posts} />
<Route path="/:postId"  component={FullPost} />
<Route path="/new-post"  component={NewPost} />
```
In this case, `/new-post` will be interfered, since whenever there is a `/` anything after it will treated as postId. Hence we need to re-arange the order of these `<Route>`
``` JSX
<Route path="/" exact component={Posts} />
<Route path="/new-post"  component={NewPost} />
<Route path="/:postId"  component={FullPost} />
```
<span style="color: red">In this case, if we route to new-post, A FullPost will also be shown.</span>  
We need to use another Component `<Switch>` provided by react-router-dom, which only render one of the `<Route>` that is being wraped.(Order still matters)
``` JSX
<Route path="/" exact component={Posts} />
<Switch>
    <Route path="/new-post"  component={NewPost} />
    <Route path="/:postId"  component={FullPost} />
</Switch>
```

#### Extracting Route Parameters:  
it's inside the `props.match.params`

***
Instead of using `<Link>` to wrap our `<Post>` component to lead to a new path, we can also use the fact of there is a click listener on the `<Post>`. For that event handler, we can use the `this.props.history` to rederict to other path.

***
### Nested Routes:  
Always keep in mind, the path in `<Route>` is always the Absolute path. Hence, when we are nesting Routes, we need to be careful about which path we want to go.

***
### Redirecting Requests:  
Say we want the user to access /posts, even if he enter /. One way to do that is we can simply set two `<Route>` and they both render the same components. But there is a better way.  

`<Redirect>` provided by react-render-dom:

- use inside the `<Switch>`: `<Redirect from='/' to='/pists' />`
- outside the `<Switch>`: from cant be specified. Often used to conditionally Redirects. Use it as normal component, give a condition to determine when it should be redirects and we conditionally render the `<Redirect>` component to stay or leave the page.

Another way to do conditionally redirect, is to using the `this.props.history`, we can push a new page when the condition meet.  
The difference between Redirect and push is that. Redirect change the current page on the page stack, where push, it push a new page on the page stack. (ps: replace behave the same as Redirecr)

### React 'Guards': 
React did not have build in guards for user redirect, ie: if the user does not have authority to a page, we dont want to show that page to the user and may want to redirect to some other page. We can achieve this behavior by conditionally render the `<Route>` component, or we can use `props.replace` in the `ComponentDidMount` to change the current page.

### Handle unknown routes:  
If we leave the `path` undefined in the `<Route>` it will catch all route. Hence we can use this at the end of `<Switch>` to show dummy message about path not found or etc.

***
### Code spilting(Lazy loading):  
Sometimes, we dont want to down load the whole application to the user. If the user never visit the new-post page, it will be meaningless to download the NewPost Component code to the user.  

We creat a new HOC component: asyncComponent
```JSX
import React, {Component} from 'react';

// importComponent should be a function returns a Promise at the end.
const asyncComponent =  (importComponent) => {
    return class extends Component{
        state = {
            component:null
        };

        componentDidMount() {
            importComponent()
            .then(cmp => {
                this.setState({component:cmp.default});
                });
        };

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;
```
we then go to the file where we want to lazy loading the component.(In our case, we want to go to Blog.js to lazy load NewPost)
```JSX
import asyncComponent from './hoc/asyncComponent';

//import NewPost from './NewPost/NewPost'; changed to dynamic import
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
    });
```
Then we can use AsyncNewPost instead of NewPost to achieve lazy loading.

#### Lazy loading for React 16.6:  
```
import React, {Component, Suspese} from 'react';

// import Posts from './containers/Posts'; changed to dynamic import

// only default import works, named import does not work
const Posts = React.lazy(() => import('./containers/Posts'));

// Whenever we want to render Post, we render the following:
<Suspense fallback={<div>Loading...</div>};
    <Posts />
</Suspense>
```

***
useful Links:  
React Router Docs: https://reacttraining.com/react-router/web/guides/philosophy











