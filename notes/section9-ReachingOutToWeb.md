# Section9: Reaching out to the Web(HTTP/Ajax)

### How to send AJAX Request:

- using JS `XMLHttpRequest` Object
- using 3rd party library - axios (we will use this way)
    + npm install axios \--save

For more information on AJAX, check out JavaScript-Notes-8.md in the Udemy-Javascript folder on Github.  
https://github.com/ZipingLiu-JokerH/Udemy-JavaScript/blob/master/JavaScript-Notes-8.md  
For more information on axios https://github.com/axios/axios  
all the axios imports share the same configuration

- `axios.get()`
- `axios.post()`
- `axios.delete()`
- axios interceptors(拦截): provide a globally scoped function that we can use whenever we send an HTTP request or we get a response back. (usecase: common headers, handle errors globally)
    + You can intercept requests or responses before they are handled by then or catch.
    ```JSX
    // Add a request interceptor
    axios.interceptors.request.use();

    // Add a response interceptor
    axios.interceptors.response.use();
    ```
    + remove an interceptor
    ```JSX
    const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
    axios.interceptors.request.eject(myInterceptor);
    ```

- config default:specify config defaults that will be applied to every request
- axios instances

***

HTTP request is a side effect, implement in the Component Create Lifecycle `componentDidMount()` step.

When in the Component LifeCycle - Update cycle.   
<span style="color: red">IMPORTANT!</span> 
We need to be careful when implementing `componentDidUpdate`. If we send AJAX request there, we should be really careful when modifiy the state, since it will create infinite loop very easily.