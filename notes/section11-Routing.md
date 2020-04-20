# Section11: Multi-page feeling in a single page App: Routing

Note: Routing is not build in React. We will use another package to support routing. React is much more like a component creation Library, now we are turning it into something like framework by adding the routing feature.

Routing is about being able to show different pages to the user. In a Single Page Application, we want to show the user different pages for different URLs. The trick is that we dont actually have multiple HTML file but we use javascript to render different pages for different path. So we dont really have different files but simply re-render parts of that single pages or maybe the entire page depending on which path the user navigated to in our application.

Package: `npm install --save react-router-dom`

To enable routing, we need to use `import {BrowserRouter} from 'react-router-dom';` and use `BrowserRouter` to wrap the Component that need routing.

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