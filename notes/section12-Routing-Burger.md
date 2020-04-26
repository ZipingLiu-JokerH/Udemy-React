# Section12: Adding Routing to our Burger Project

` this.props.history.goBack()` go back to the previous page  
` this.props.history.replace()` replace current page  

### passing parameters via Query Params:  
```JSX
const queryParams = [];
for (let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
const queryString = queryParams.join('&');

this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
});
```
Here we use push, to push a Javascript object to modified the url. Where the search indicate a search query. We form the string like above. Then we can extract the query Params on the other page. (/checkout)
```JSX
componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()){
        // ['salad', '1']
        ingredients[param[0]] = parseInt(param[1]);
    }
    this.setState({ingredients:ingredients});
};
```

##### Another trick to pass Params:
instead of using the `component` property in the `<Router>`, we can use the `render` property, which takes in a function return some JSX code. There we can hard code what we want to pass. Using this approach will not set the Render props automatically(history,location, match)
```JSX
<Router 
    path='/checkout/contact-data'
    render = {() => (<Contactdata ingredients={this.state.ingredients} />)}
/>
```
```JSX
<Router 
    path='/checkout/contact-data'
    render = {(props) => (<Contactdata 
                        ingredients={this.state.ingredients}
                        {...props} />)}
/>
```
we can use the above method to pass the (history, location, math props) or we can use with `withRouter` to wrap `Contact-data`
***
### for-in loop VS for-of loop:  
<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in'> for in</a>  
<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of'> for of</a> 

Both for...in and for...of statements iterate over something. The main difference between them is in what they iterate over.

The for...in statement iterates over the enumerable properties of an object, in an arbitrary order.

The for...of statement iterates over values that the iterable object defines to be iterated over.













